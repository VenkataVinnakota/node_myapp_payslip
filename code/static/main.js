let csv = null;


$(document).ready(() => {
  document.getElementById('txtFileUpload').addEventListener('change', upload, false);

  function browserSupportFileUpload() {
    let isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isCompatible = true;
    }
    return isCompatible;
  }

  function upload(evt) {
    if (!browserSupportFileUpload()) {
      alert('The File APIs are not fully supported in this browser!');
    } else {
      const file = evt.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append('myfile', file);
      console.log(formData);
      const url = window.location.href;
      console.log(url);

      $.ajax({
        url: `${url}upload`,
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success(res) {
          data = JSON.parse(res);

          csv = `${Object.keys(data[0]).join(',')}\r\n`;

          for (let j = 0; j < data.length; j++) {
            let line = '';
            for (const index in data[j]) {
              line += data[j][index];
              if (line !== '') {
                line += ',';
              }
            }
            csv += `${line}\r\n`;
          }
        },
        crossDomain: true,
      });
    }
  }


  $('#display').click(() => {
    console.log(csv);
    if (csv === null) {
      alert('Please upload a csv file');
    } else {
      let build = '<table border="1" cellpadding="2" cellspacing="0">\n';
        	const rows = csv.split('\n');
        	rows.forEach((thisRow) => {
            	build += '<tr>\n';
            	const columns = thisRow.split(',');
            	for (let i = 0; i < columns.length; i++) { build += `<td>${columns[i]}</td>\n`; }
            	build += '</tr>\n';
      });
        	build += '</table>';
        	$('.payslip').append(build);
    }
  });


  $('#download').on('click', () => {
    if (csv === null) {
      alert('Please upload a csv file');
    } else {
      const a = document.createElement('a');
      a.href = `data:attachment/csv,${encodeURIComponent(csv)}`;
      a.target = '_blank';
      a.download = 'payslip.csv';

      document.body.appendChild(a);
      a.click();
    }
  });
});
