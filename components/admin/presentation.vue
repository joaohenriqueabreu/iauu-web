<template>
  <modal ref="modal">
    <template v-slot:header v-if="!$empty(presentation)">
      <div class="d-flex justify-content-between">
        <div class="vertical middle">
          <h4 class="mb-2">{{ presentation.proposal.title }}</h4>
          <h6 class="status-badge mr-4" :class="presentation.status">{{ statusLabel }}</h6>
        </div>
        <div class="d-flex align-items-end">
          <h5 class="identifier">{{ presentation.status === 'proposal' ? 'Proposta' : 'Apresentação' }}</h5>
        </div>
      </div>
    </template>
    <template v-slot:main v-if="!$empty(presentation)">
      <div>
        <h4 class="mb-4">Informações</h4>
        <div>ID</div>
        <h6 class="mb-4">{{ presentation.id }}</h6>
        <div class="vertical">
          <div>Contratante</div>
          <h6 class="mb-4">{{ presentation.contractor.user.name }}</h6>
          <div>{{ presentation.contractor.user.email }}</div>
        </div>
        <div class="vertical">
          <div>Artista</div>
          <h6 class="mb-4">{{ presentation.artist.user.name }}</h6>
          <div>{{ presentation.artist.user.email }}</div>
        </div>
        <div v-if="presentation.status === 'proposal'">
          <div>Valor em negociação</div>
        </div>
        <div v-else>

        </div>
        <div v-if="presentation.status === 'proposal'">
          <div>Datas da proposta</div>
          <div class="horizontal">
            <div v-for="(timeslot, index) in presentation.proposal.timeslots" :key="index" class="vertical">
              <h6>{{ timeslot.start_dt | datetime }}</h6>
            </div>
          </div>
        </div>
        <div v-else>
          <div>Data da apresentação</div>
          <div class="horizontal">
            <h6>{{ presentation.timeslot.start_dt | datetime }}</h6>
            <h6>{{ presentation.timeslot.end_dt | datetime }}</h6>
          </div>
        </div>
      </div>
      <hr>
      <!-- <div>
        <h4 class="mb-4">Gerenciar</h4>
        <div class="row">
          <div class="col-sm-4 mb-4" v-if="['active', 'pending'].includes(user.status)">
            <form-button @action="handleBlockUser">Bloquear</form-button>
          </div>
          <div class="col-sm-4 mb-4" v-if="['blocked', 'pending'].includes(user.status)">
            <form-button @action="handleActivateUser">Ativar</form-button>
          </div>
          <div class="col-sm-4 mb-4" v-if="!isVerified">
            <form-button @action="handleVerification">Verificar usuário</form-button>
          </div>
          <div class="col-sm-4 mb-4">
            <form-button @action="handleChangePassword">Alterar de senha</form-button>
          </div>
        </div>
      </div> -->
    </template>
  </modal>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  props: {
    presentation: { type: Object, default: () => {}},
  },
  computed: {
    statusLabel() {
      if (this.presentation.status === 'proposal') { return 'Proposta'}
      if (this.presentation.status === 'rejected') { return 'Proposta recusada'}
      if (this.presentation.status === 'accepted') { return 'Apresentação contratada'}
      if (this.presentation.status === 'completed') { return 'Apresentação realizada'}
      if (this.presentation.status === 'cancelled') { return 'Apresentação cancelada'}
      return ''
    }
  },
  methods: {
    // ...mapActions('admin', ['blockUser', 'activateUser', 'resendVerification', 'verifyUser']),
    openModal() {
      this.$refs.modal.open()
    }
  }
}
</script>

<style lang="scss" scoped>
// TODO move to a common layer (repeated from admin/user/index)
.role-badge, .status-badge, .verification-label {
  &.icon-only {
    width: 25px;
    height: 25px;
  }

  &.selected {
    background: $brandLayer;
  }

  padding: $space;
  border-radius: $edges;
  [data-icon] {
    margin: 0;
  }

  // Role specific classes
  &.admin { background: $layer1; }
  &.artist { background: $layer5; }
  &.contractor { 
    background: $brandLayer; 
    color: $layer5;
  }

  // Status specific classes
  &.pending { background: $layer5; }
  &.active { background: $green; }
  &.blocked { background: $error;  }

  &.verified { background: $green; }
}
</style>