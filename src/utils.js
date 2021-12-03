import XLSX from 'xlsx';

Array.prototype.subtract = function (array) {
    let _array = [...array].slice();
    return this.filter(function (a) {
       var p = _array.indexOf(a);
       if (p === -1)  {
           return true;
       }
       _array.splice(p, 1);
    });
}

function createCSVBuffer (obj) {
    const sheet = XLSX.utils.json_to_sheet(obj);
    const csv = XLSX.utils.sheet_to_csv(sheet);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb,sheet,"Sheet1");
    const universalBOM = '\uFEFF';
    const txt = universalBOM + csv;
    return Buffer.from(txt, 'utf-8');
    // const wopts = { bookType:'xlsx', bookSST:false, type:'base64' };
    // var wbout = XLSX.write(wb,wopts);    
    // return wbout

}

function csvTextToJSON(csvText) {
    const dataStringLines = csvText.split(/\r\n|\n/);
    const headers = dataStringLines[0]
        .split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(h => h.replace(/"/g, ''));
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(
            /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );
        if (headers && row.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                let d = row[j];
                if (d.length > 0) {
                    if (d[0] === '"') d = d.substring(1, d.length - 1);
                    if (d[d.length - 1] === '"')
                        d = d.substring(d.length - 2, 1);
                }
                if (headers[j]) {
                    obj[headers[j]] = d;
                }
            }

            // remove the blank rows
            if (Object.values(obj).filter(x => x).length > 0) {
                list.push(obj);
            }
        }
    }
    return list;
}

export {
    createCSVBuffer,
    csvTextToJSON,
}