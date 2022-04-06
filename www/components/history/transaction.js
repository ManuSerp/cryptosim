function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

export default function Transaction({ achat, vente, q1, q2, date }) {
    return (
      <>
        <div className="Transaction">
          <h1>{timeConverter(date)}</h1>
          Achate de {q1} {achat} au prix de {q2} {vente}
        </div>
      </>
    );
  }
  