// import axios from 'axios';
// const FormData = require('form-data');

// export default function getResult (csvFile) {
// 	const formData = new FormData();

//   formData.append('csv_file', new Blob([csvFile]))
    
// 	// formData.append('csv_file', new Blob([csvFile],{type : 'text/csv'}));
//   // formData.append('csv_file', 'text.xlsx');
//   // formData.append('data', csvFile);
// 	return axios.post('/demo', formData, {
//         // headers: {
//         //   'Content-Type': 'text/csv'
//         // }
//       });
// }


import axios from 'axios';
const FormData = require('form-data');

export default function getResult (csvFile) {
	const formData = new FormData();
    
	formData.append('file'/**fuck  name */, new Blob([csvFile],{type : 'multipart/form-data'}));
	return axios.post('/demo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
}
