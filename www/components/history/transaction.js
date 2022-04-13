function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
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
          <div id="date">{timeConverter(date)}</div>
          <div>Achat de {q1} {achat} au prix de {Number.parseFloat(q2).toFixed(2)} {vente}</div>
        </div>
      </>
    );
  }
  