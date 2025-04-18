import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from './compornent/Header';
import Menulist from './compornent/Menulist';
import Reserch from './compornent/Reserch';

function App() {
    //初期状態を設定する又はローカルストレージからデータを取得する
    const [visibleReserch, setVisibleReserch] = useState(() => 
        JSON.parse(localStorage.getItem('visibleReserch')) ?? false);
    const [keywordList, setKeywordList] = useState(() => 
        JSON.parse(localStorage.getItem('keywordList')) || []);
    const [data, setData] = useState(() => 
        JSON.parse(localStorage.getItem('data')) || {});
    const [checked, setChecked] = useState(() => 
        JSON.parse(localStorage.getItem('checked')) || '0');
    const [visibleKeywordList, setVisibleKeywordList] = useState(() => 
        JSON.parse(localStorage.getItem('visibleKeywordList')) ?? true);
    const [visibleBookList, setVisibleBookList] = useState(() => 
        JSON.parse(localStorage.getItem('visibleBookList')) ?? false);
    const [keyword, setKeyword] = useState("");
    //状態変更時にローカルストレージにデータを保存する
    useEffect(() => {
        localStorage.setItem('visibleReserch', JSON.stringify(visibleReserch));
        localStorage.setItem('keywordList', JSON.stringify(keywordList));
        localStorage.setItem('keyword', JSON.stringify(keyword));
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('checked', JSON.stringify(checked));
        localStorage.setItem('visibleKeywordList', JSON.stringify(visibleKeywordList));
        localStorage.setItem('visibleBookList', JSON.stringify(visibleBookList));
    }, [visibleReserch, keywordList, keyword, data, checked, visibleKeywordList, visibleBookList]);

    //Reserchコンポーネントの表示（準備）
    const reserch = () => {
        setVisibleReserch(true);
    };

    //キーワードの追加
    const handleAddKeyword = (e) => {
        e.preventDefault(); //文字入力のたびに再レンダリングするのを防ぐ
        
        keyword !== '' && //inputフィールドが空の時はkeywordを更新したくないため
        setKeywordList((prevKeywordList) => {
            return [...prevKeywordList, {id: uuidv4(), name: keyword}];
        });
        
        setKeyword("");
        
        setVisibleKeywordList(true);
        setVisibleBookList(false);
        
    };
    //キーワードの削除削除
    const handleRemoveKeyword = (keywordId) => {
        setKeywordList((prevKeywordList) => {
            const newKeywordList = prevKeywordList.filter((item) => item.id !== keywordId);
            return newKeywordList;
        });
    };

    //書籍情報の取得
    const getBooks = async(e) => {
        //APIに情報を渡すために入力されたキーワードを一つの文字列にする
        const keywordListCopy = [...keywordList];
        const connectedKeyword = keywordListCopy.map((item) => item.name).join(' ');
        
        const checkedValue = Number(checked);

        try {
            //最初のページを取得
            //URLに日本語が含まれるのでUTF-8でエンコードする
            const firstPageUrl = encodeURI(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${connectedKeyword}&size=${checkedValue}&hits=30&page=1&applicationId=1072685626503950157`);        
            const firstResponse = await fetch(firstPageUrl);
            if(!firstResponse.ok) throw new Error();
            const firstData = await firstResponse.json();

            //総ページ数を計算
            const totalPages = Math.ceil(firstData.count / 30);

            //残りのページを取得
            const promises = []; //promiseの状態と完了したときに受け取るデータの配列
            for (let page = 2; page <= totalPages;  page++) {
                const pageUrl = encodeURI(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${connectedKeyword}&size=${checkedValue}&hits=30&page=${page}&applicationId=1072685626503950157`);
                promises.push(fetch(pageUrl).then(res => res.json()));
            }
            //全てのリクエストの完了を待ち、結果を受け取る
            const responses = await Promise.all(promises);
            
            //最初のデータと残りのデータを結合
            const allData = {
                ...firstData,
                Items: [
                    ...firstData.Items,
                    ...responses.flatMap(responses => responses.Items)
                ]
            };
            setData(allData);
        } catch (error) {
            alert('エラーが発生しました。')
        }
    };

    //checkedの状態の更新（APIリクエストの際に用いる）
    const handleToggleChecked = (e) => {
        const selectedValue = e.target.value
        setChecked(selectedValue);
    };

    //書籍情報の取得と取得後のコンポーネントの表示（準備）
    const handleSerchbtnClick = async() => {
        await getBooks();
        setVisibleBookList(true);
        setVisibleKeywordList(false);
    }
    
    return (
        <>
            <Header />  
            <Menulist reserch={reserch} />
            {
            visibleReserch && 
            <Reserch 
            keyword={keyword} 
            setKeyword={setKeyword} 
            keywordList={keywordList} 
            handleAddKeyword={handleAddKeyword} 
            handleRemoveKeyword={handleRemoveKeyword} 
            data={data} 
            checked={checked} 
            handleToggleChecked={handleToggleChecked} 
            visibleKeywordList={visibleKeywordList}
            visibleBookList={visibleBookList}
            handleSerchbtnClick={handleSerchbtnClick} 
            />
            }
        </>
    );
}

export default App;