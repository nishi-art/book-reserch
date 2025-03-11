import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from './compornent/Header';
import Menulist from './compornent/Menulist';
import Reserch from './compornent/Reserch';

function App() {
    const [showReserch, setShowReserch] = useState(false);
    const [keywordList, setKeywordList] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [data, setData] = useState("");
    

    const reserch = () => {
        setShowReserch(true);
    };

    const handleAddKeyword = (e) => {
        e.preventDefault();
        
        keyword !== '' && //inputフィールドが空の時はkeywordを更新したくないため
        setKeywordList((prevKeywordList) => {
            return [...prevKeywordList, {id: uuidv4(), name: keyword}];
        });
        
        setKeyword("");
    };
    const handleRemoveKeyword = (keywordId) => {
        setKeywordList((prevKeywordList) => {
            const newKeywordList = prevKeywordList.filter((item) => item.id !== keywordId);
            return newKeywordList;
        });
    };

    const getBooks = async(e) => {
        //APIに情報を渡すために入力されたキーワードを一つの文字列にする
        const keywordListCopy = [...keywordList];
        const connectedKeyword = keywordListCopy.map((item) => item.name).join(' ');
        //URLに日本語が含まれるのでUTF-8でエンコードする
        const encodedUrl = encodeURI(`https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=${connectedKeyword}&applicationId=1072685626503950157`);
        

        //理解を深めるため細かくコメントアウトする
        //fetchでリクエストを送る。返ってくるのはpromis
        await fetch(encodedUrl)
            .then(res => {
                if(!res.ok) throw new Error(); //受け取ったレスポンスが正常ではなかったらcatchに処理が移る
                return res.json(); //レスポンスが返ってきたら受け取ったデータをjson形式に変換する
            })
            .then(jsonData => {setData(jsonData);console.log(jsonData);
            })
            .catch(() => alert('エラーが発生しました。'));
    };
    
    
    return (
        <>
            <Header />  
            <Menulist reserch={reserch} />
            {
            showReserch && 
            <Reserch 
            keyword={keyword} 
            setKeyword={setKeyword} 
            keywordList={keywordList} 
            handleAddKeyword={handleAddKeyword} 
            handleRemoveKeyword={handleRemoveKeyword} 
            getBooks={getBooks}
            />
            }
        </>
    );
}

export default App;