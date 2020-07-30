<template>
  <div>
    <div class="vertical mb-5">
      <div class="horizontal middle mb-4">
        <h4 class="mr-4">Usuários</h4>
        <form-input class="full-width mr-5" v-model="searchTerm" @enter="handleSearchUsers" @blur="handleSearchUsers" placeholder="Pesquisa" icon="user"></form-input>
      </div>
      <div class="horizontal">
        <span v-for="role in ['artist', 'contractor']" 
          :key="role" 
          :class="{role, selected: role === filter}" 
          class="role-badge mr-4 horizontal center middle clickable" 
          @click="filterByRole(role)">
          <font-awesome :icon="roleIcon(role)" class="mr-2"></font-awesome>
          {{ roleLabel(role) }}s
        </span>
        <span v-for="status in ['active', 'blocked', 'pending']" 
          :key="status" 
          :class="{status, selected: status === filter}" 
          class="status-badge mr-4 horizontal center middle clickable" 
          @click="filterByStatus(status)">
          <font-awesome :icon="statusIcon(status)" class="mr-2"></font-awesome>
          {{ statusLabel(status) }}s
        </span>
      </div>
    </div>
    <perfect-scrollbar>
      <table class="full-width">
        <thead>
          <th></th>
          <th></th>
          <th class="text-center">Login</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Admissão</th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" @click="openUserManagementModal(user)">
            <td class="text-center">
              <h6 class="role-badge icon-only" :class="user.role"><font-awesome :icon="roleIcon(user.role)"></font-awesome></h6>
            </td>
            <td class="text-center">
              <div class="status-badge icon-only" :class="user.status"><font-awesome :icon="statusIcon(user.status)"></font-awesome></div>
            </td>
            <td class="text-center">
              <font-awesome icon="play" class="login-as clickable" @click="handleLoginAs(user.id)"></font-awesome>
            </td>
            <td class="py-3 cap horizontal middle">
              <span class="mr-2">{{ user.name }}</span>
            </td>
            <td>{{ user.email }}</td>
            <td>{{ user.created_at | date }}</td>
          </tr>
        </tbody>
      </table>
    </perfect-scrollbar>
    <modal ref="modal">
      <template v-slot:header v-if="!$empty(selectedUser)">
        <div class="d-flex justify-content-between">
          <div class="horizontal middle">
            <avatar :src="selectedUser.photo" :username="selectedUser.name" class="mr-4"></avatar>
            <div class="vertical middle">
              <h4 class="mb-2">{{ selectedUser.name }}</h4>
              <div class="horizontal middle">
                <h6 class="status-badge mr-4" :class="selectedUser.status">{{ statusLabel(selectedUser.status) }}</h6>
                <h6 class="verification-badge" :class="{ verified: selectedUser.status }">{{ verificationLabel(selectedUser.verification.is_verified) }}</h6>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-end">
            <h5 class="role-badge" :class="userRole(selectedUser)">{{ roleLabel(selectedUser.role) }}</h5>
          </div>
        </div>
      </template>
      <template v-slot:main v-if="!$empty(selectedUser)">
        <div>
          <h4 class="mb-4">Informações</h4>
          <div>ID</div>
          <h6 class="mb-4">{{ selectedUser.id }}</h6>
          <div>Email</div>
          <h6 class="mb-4">{{ selectedUser.email }}</h6>
          <div>Admissão</div>
          <h6 class="mb-4">{{ selectedUser.created_at | date }}</h6>
          <div class="mb-4">
            <div>Último Login</div>
            <h6 class="mb-4" v-if="!$empty(selectedUser.last_logged_in_at)">{{ selectedUser.last_logged_in_at | datetime }}</h6>
            <h6 v-else>-</h6>
          </div>
          <div v-if="!isVerified" class="mb-4">
            <div>Verificação</div>
            <div class="horizontal middle">
              <div class="vertical">
                <h6 class="mr-4">Enviado em {{ selectedUser.verification.issued_at | datetime }}</h6>
                <small class="error">Expira em {{ verifyTokenExpiry | datetime }}</small>
              </div>
              
              <h6 class="clickable" @click="handleResendVerification"><u>Reenviar</u></h6>
            </div>
          </div>
        </div>
        <div v-if="!$empty(userStats)">
          <hr>
          <h4 class="mb-4">Estatísticas</h4>
          <div class="row">
            <div class="col-sm-3 mb-4" v-if="!$empty(userStats[0].presentations)">
              <div class="boxed">
                <h5>{{ userStats[0].presentations[0].count }}</h5>
                <h6>Apresentações</h6>
              </div>
            </div>
            <div class="col-sm-3 mb-4" v-if="!$empty(userStats[0].proposals)">
              <div class="boxed">
                <h5>{{ userStats[0].proposals[0].count }}</h5>
                <h6>Propostas</h6>
              </div>
            </div>
            <div class="col-sm-3 mb-4" v-if="!$empty(userStats[0].rejected)">
              <div class="boxed">
                <h5>{{ userStats[0].rejected[0].count }}</h5>
                <h6>Rejeitadas</h6>
              </div>
            </div>
            <div class="col-sm-3 mb-4" v-if="!$empty(userStats[0].accepted)">
              <div class="boxed">
                <h5>{{ userStats[0].accepted[0].count }}</h5>
                <h6>Contratads</h6>
              </div>
            </div>
            <div class="col-sm-3 mb-4" v-if="!$empty(userStats[0].completed)">
              <div class="boxed">
                <h5>{{ userStats[0].completed[0].count }}</h5>
                <h6>Realizadas</h6>
              </div>
            </div>
            <div class="col-sm-3 mb-4" v-if="!$empty(userStats[0].cancelled)">
              <div class="boxed">
                <h5>{{ userStats[0].cancelled[0].count }}</h5>
                <h6>Canceladas</h6>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div>
          <h4 class="mb-4">Gerenciar</h4>
          <div class="row">
            <div class="col-sm-4 mb-4" v-if="['active', 'pending'].includes(selectedUser.status)">
              <form-button @action="handleBlockUser">Bloquear</form-button>
            </div>
            <div class="col-sm-4 mb-4" v-if="['blocked', 'pending'].includes(selectedUser.status)">
              <form-button @action="handleActivateUser">Ativar</form-button>
            </div>
            <div class="col-sm-4 mb-4" v-if="!isVerified">
              <form-button @action="handleVerification">Verificar usuário</form-button>
            </div>
            <div class="col-sm-4 mb-4">
              <form-button @action="handleChangePassword">Alterar de senha</form-button>
            </div>
            <div class="col-sm-12 mb-4" v-if="selectedUser.role === 'contractor'">
              <form-button @action="handleLoginAs(selectedUser.id)">Enviar proposta em nome de {{ selectedUser.name }}</form-button>
            </div>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  async asyncData({ store }) {
    await store.dispatch('admin/loadUsers')
  },
  computed: {
    ...mapState({ allUsers: (state) => state.admin.users }),
    ...mapState({ selectedUser: (state) => state.admin.user }),
    ...mapState({ userStats: (state) => state.admin.stats.users }),
    ...mapGetters('admin', ['adminUsers', 'artistUsers', 'contractorUsers', 'pendingUsers', 'activeUsers', 'blockedUsers']),
    isVerified() {
      return !this.$empty(this.selectedUser.verification) && this.selectedUser.verification.is_verified
    },
    verifyTokenExpiry() {
      return this.moment(this.selectedUser.verification.issued_at).add('1', 'days').toString()
    }
  },
  data() {
    return {
      filter: null,
      searchTerm: '',
      users: []
    }
  },
  mounted() {
    this.users = this.allUsers
  },
  watch: {
    allUsers(value) {
      this.users = value
    }
  },
  methods: {
    ...mapActions('admin', ['loadUsers', 'loadUserStats', 'searchUsers', 'blockUser', 'activateUser', 'resendVerification', 'verifyUser']),
    userRole(user) {
      return this.selectedUser === ''
    },
    async handleSearchUsers() {
      if (this.$empty(this.searchTerm)) {
        await this.loadUsers()
        return 
      }

      await this.searchUsers(this.searchTerm)
    },
    filterByRole(role) {
      if (this.filter === role) {
        this.users = this.allUsers
        this.filter = null
        return
      }

      this.filter = role

      if (role === 'artist') { this.users = this.artistUsers }
      if (role === 'contractor') { this.users = this.contractorUsers }
    },
    filterByStatus(status) {
      if (this.filter === status) {
        this.users = this.allUsers
        this.filter = null
        return
      }

      this.filter = status

      if (status === 'pending') { this.users = this.pendingUsers }
      if (status === 'active') { this.users = this.activeUsers }
      if (status === 'blocked') { this.users = this.blockedUsers }
    },
    statusLabel(status) {
      if (status === 'pending') { return 'Aguardando verificação' }
      if (status === 'active') { return 'Ativo' }
      if (status === 'blocked') { return 'Bloqueado' }
      return ''
    },
    statusIcon(status) {
      if (status === 'pending') { return 'ellipsis-h' }
      if (status === 'active') { return 'check' }
      if (status === 'blocked') { return 'lock' }
      return ''
    },
    roleLabel(role) {
      if (role === 'artist') { return 'Artista' }
      if (role === 'contractor') { return 'Contratante' }
      return ''
    },
    roleIcon(role) {
      if (role === 'artist') { return 'music' }
      if (role === 'contractor') { return 'dollar-sign' }
      return ''
    },
    verificationLabel(verified) {
      return verified ? 'Verificado' : 'Aguardando verificação'
    },
    async openUserManagementModal(user) {
      await this.loadUserStats(user.id)
      this.$refs.modal.open()
    },
    async handleBlockUser() {
      await this.blockUser(this.selectedUser)
      this.$toast.success('Usuário bloqueado com sucesso')
      await this.loadUsers()
    },
    async handleActivateUser() {
      await this.activateUser(this.selectedUser)
      this.$toast.success('Usuário ativado com sucesso')
      await this.loadUsers()
    },
    async handleResendVerification() {
      await this.resendVerification(this.selectedUser)
      this.$toast.success('Email de verificação reenviado com sucesso')
    },
    async handleVerification() {
      await this.verifyUser(this.selectedUser)
      this.$toast.success('Usuário verificado com sucesso')
      await this.loadUsers()
    },
    async handleChangePassword() {
      await this.blockUser(this.selectedUser)
      this.$toast.success('Link para troca de senha reenviado com sucesso')
    },
    async handleLoginAs(id) {
      await this.$auth.loginWith('admin', {
        data: {
          token: this.$auth.user.admin_token,
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ps {
  max-height: 60vh;
}

table {
  tr {
    padding-bottom: 4 * $space;
    transition: $transition;
    &:hover {
      transition: $transition;
      background: $layer5;
    }
  }
}

.boxed {
  @extend .vertical, .middle, .center;
  background: $layer4;
  box-shadow: $shadow;
  border-radius: $edges;
  padding: 4 * $space;
}

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

.login-as {
  background: $layer5;
  padding: 5px;
  height: 20px;
  width: 20px;
  border-radius: $rounded;
  transition: $transition;
  &:hover {
    transition: $transition;
    color: $brandLayer;
  }
}
</style>