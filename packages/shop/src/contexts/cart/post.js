export default function ZBA() {
    const response = new XMLHttpRequest();
    const json = JSON.stringify({
        title : arguments[1],
         discount: arguments[2],
         unique:arguments[3],
         generalCategory:arguments[4],
         category:arguments[5],
         price :arguments[6],
         salePrice :arguments[7],
         unit:arguments[8],
         type:arguments[9],
         orderNumber:arguments[11],
         ipAddress:arguments[12],
         userAgent:arguments[13]
    });

    response.open(arguments[0], arguments[10])
    response.setRequestHeader('Content-Type', 'application/json');

    response.send(json);

    response.onload = (e) => {
        alert(response.response);
    }


}
export { ZBA };