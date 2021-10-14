export function lhcColor (num) {
  const LHC_HONG = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46']
  const LHC_LANG = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
  const LHC_LU = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49']
  if (LHC_HONG.includes(num)) {
    return 'ball-red'
  }
  if (LHC_LANG.includes(num)) {
    return 'ball-blue'
  }
  if (LHC_LU.includes(num)) {
    return 'ball-green'
  }
}
