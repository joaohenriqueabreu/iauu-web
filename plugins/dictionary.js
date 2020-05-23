const dictionary = {
  payment: {
    label: {
      closed: 'Retirado',
      active: 'Realizado',
      pending: 'Pendente',
      total: 'Total'
    }
  },
  artist: {
    stats: {
      label: {
        presentations: 'Apresentações',
        public: 'Méd. Público',
        score: 'Avaliações'
      },
      icon: {
        presentations: 'music',
        public: 'child',
        score: 'star'
      }
    }
  }
}

export default ({ app }, inject) => {
  inject('dictionary', dictionary)
}
