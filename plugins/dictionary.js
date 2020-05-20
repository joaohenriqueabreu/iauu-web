const dictionary = {
  payment: {
    label: {
      closed: 'Retirado',
      active: 'Realizado',
      pending: 'Pendente',
      total: 'Total'
    }
  }
}

export default ({ app }, inject) => {
  inject('dictionary', dictionary)
}
