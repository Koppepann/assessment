'use strict';
const userNameInput = document.getElementById('user-name');//各HTMLを取得
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result2');
const tweetDivided = document.getElementById('tweet');

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
  };

assessmentButton.onclick = function () {
    const userName = userNameInput.value;//ユーザー名を代入
    if (userName.length === 0) {
        return; //文字列の長さが0（何も入力されていない）場合はreturnを返して終了
    }
    //

    removeallchildren(resultDivided); //child要素を削除(消さないとボタンを複数回押すとその分だけ表示されるため)
    const header = document.createElement('h3');//h3タグ追加
    header.innerText = '診断結果';
    resultDivided.appendChild(header)//?appendchildがnull?←htmlのscriptがタグの前にあったから読み込まれていなかった


    const paragraph = document.createElement('p');//pタグ追加
    const result = assessment(userName);//変数resultに診断結果を代入
    paragraph.innerText = result;//pタグの属性を持っている変数paragraphにresultを代入
    resultDivided.appendChild(paragraph);//pタグに変数paragrah要素を追加

    removeallchildren(tweetDivided);
    const tweet=document.createElement('h3');
    tweet.innerText='SNS';
    tweetDivided.appendChild(tweet);

    const anchor = document.createElement('a');//aタグ追加
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag=あなたの良いところ&ref_src=twsrc%5Etfw';//変数herfvalueにURL設定
    anchor.setAttribute('href',hrefValue);//
    anchor.className='twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText='Tweet #あなたの良いところ';
    tweetDivided.appendChild(anchor);
  
    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};




/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName ユーザーの名前
 * 
 */
function removeallchildren(element) {
    while (element.firstChild) {//childが存在する間繰り返す
        element.removeChild(element.firstChild);//elementの最初のchildを削除
    }
}
function assessment(userName) {
    //全文字の文字コードを取得し、足し合わせる
    let sum0fCharCode = 0;//{}内のみ使える変数sum0fcharcode
    for (let i = 0; i < userName.length; i++) {//iがuseNameを超えるまで
        sum0fCharCode = sum0fCharCode + userName.charCodeAt(i);//sum=sum+userNamei番目の文字コード
    }
    //文字のコード番号を解答の数で割って添え字の数値を求める
    const index = sum0fCharCode % answers.length;//合計　%　answersの配列数
    let result = answers[index];//result=answer[上の結果]

    result = result.replace(/\{userName\}/g, userName);//{useName}にユーザー名を置き換える?
    return result;       //?↑正規表現とは?

}

//テスト
//↓名前と診断結果のテスト
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。'
    , '診断結果の名前が違う'
);
console.assert(
    assessment('太郎') === assessment('太郎')
    , '診断エラー'
);
