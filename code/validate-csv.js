exports.validateCsv1 = (empDetails, pos) => {
  
  let payPeriod = [];
  let trigger = 0;

  switch (pos) {
    case 0:
    case 1:
      if (!/^[a-zA-Z ]+$/.test(empDetails[pos])) trigger = 1;
      break;
    case 2:
      if (!/^[0-9 ]+$/.test(empDetails[pos]) || Math.sign(empDetails[pos]) < 0) trigger = 1;
      break;
    case 3:
      if (parseInt(empDetails[pos].replace('%', ''), 10) < 0
              || parseInt(empDetails[pos].replace('%', ''), 10) > 12
              || !/^\d+(\.\d{1,2})?%+$/.test(empDetails[pos])) {
        trigger = 1;
      }
      break;
    case 4:
      payPeriod = empDetails[pos].split(' ');

      if (!empDetails[pos]) trigger = 1;
      if (payPeriod[1] !== payPeriod[4]) trigger = 1;
      if (['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(payPeriod[1])) {
        if (payPeriod[0] !== '01' || payPeriod[3] !== '31') trigger = 1;
      } else if (['April', 'June', 'September', 'November'].includes(payPeriod[2])) {
        if (payPeriod[0] !== '01' || payPeriod[3] !== '30') trigger = 1;
      } else if (['February'].includes(payPeriod[1])) {
        if (payPeriod[0] !== '01' || (payPeriod[3] !== '28')) trigger = 1;
      }
      break;
    default:
  }

  
  if (trigger === 1) return trigger;
  else return trigger;
};
