const dictionary = {
  payment: {
    label: {
      closed: 'Saque',
      active: 'Realizado',
      pending: 'Pendente',
      total: 'Total'
    },
    icons: {
      closed: 'Saque',
      active: 'Realizado',
      pending: 'Pendente',
      total: 'Total'
    }
  }
}

export default ({ app }, inject) => {
  inject('dictionary', dictionary)
}
