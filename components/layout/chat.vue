<template>
  <div>
    <beautiful-chat
      v-if="!$empty(presentation) && authorized"
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @edit="editMessage">
      <template v-slot:header>
        <div class="vertical ml-4">
          <h5 class="mb-2">{{ presentation.proposal.title }}</h5>
          <h6 class="horizontal middle mb-2"><font-awesome icon="clock" class="mr-2"></font-awesome> {{ presentationDate | date }}</h6>
          <h6 class="horizontal middle mb-2"><font-awesome icon="user" class="mr-2"></font-awesome>{{ otherPartyName }}</h6>
        </div>
      </template>
    </beautiful-chat>
  </div>
</template>

<script>
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'

export default {
  props: {
    presentation: { type: Object, default: () => {}}
  },
  data() {
    return {
      authorized: false,
      socket: {},
      messageList: [],
      icons:{
        open:{
          img: OpenIcon,
          name: 'default',
        },
        close:{
          img: CloseIcon,
          name: 'default',
        },
        file:{
          img: FileIcon,
          name: 'default',
        },
        closeSvg:{
          img: CloseIconSvg,
          name: 'default',
        },
      },
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: '',
      colors: {
        header: { bg: this.$config.colors.brandLayer, text: this.$config.colors.layer1 },
        launcher: { bg: this.$config.colors.brandLayer },
        messageList: { bg: this.$config.colors.white },
        sentMessage: { bg: this.$config.colors.brandLayer, text: this.$config.colors.layer1 },
        receivedMessage: { bg: this.$config.colors.layer7, text: this.$config.colors.white },
        userInput: { bg: this.$config.colors.layer10, text: this.$config.colors.layer1 }
      },
      alwaysScrollToBottom: true,
      messageStyling: true
    }
  },
  mounted() {
    const self = this
    self.socket = self.$nuxtSocket({ 
      name: 'chat',
      channel: '/chat'
    })

    // Enter the presentation room
    self.socket.emit('join', self.presentation.id)
    
    /* Listen for events: */
    self.socket.on('welcome', (messages) => { 
      self.authorized = true
      if (!self.$empty(messages)) {
        messages.forEach((message) => { self.messageList.push(self.parseMyMessage(message)) })
      }
    })

    self.socket.on('received', (message) => {
      console.log(message)
      self.messageList.push(self.parseMyMessage(message))
    })
  },
  computed: {
    participants() {
      return [
        { id: this.presentation.artist.user.id, name: this.presentation.artist.user.name, imageUrl: this.presentation.artist.user.photo },
        { id: this.presentation.contractor.user.id, name: this.presentation.contractor.user.name, imageUrl: this.presentation.contractor.user.photo },
      ]
    },
    presentationDate() {
      if (this.presentation.status === 'proposal') {
        return this.presentation.proposal.timeslots[0].start_dt
      }

      return this.presentation.timeslot.start_dt
    },
    otherPartyName() {
      if (this.$auth.hasScope('artist')) {
        return this.presentation.contractor.user.name
      }

      return this.presentation.artist.user.name
    }
  },
  methods: {
    parseMyMessage(message) {
      if (message.author === this.$auth.user.id) {
        message.author = 'me'
      }

      return message
    },
    sendMessage (text) {
      // if (text.length > 0) {
      //   this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
      //   this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      // }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      
      // Parse author to user id
      message.author = this.$auth.user.id
      this.socket.emit('send', message)
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}

</script>

<style lang="scss">
  .sc-launcher {
    z-index: 10 * $moveToTop;
    &.opened {
      z-index: 0;
    }
  }

  .sc-chat-window {
    /** overwrite ChatWindow.vue */
    font-family: Gotham, Roboto !important;
    &.opened {
      z-index: 10 * $moveToTop;
    }

    .sc-user-input--button {
      margin-left: 2 * $space;
    }

    .sc-message--content {
      &.received {
        .sc-message--text, .sc-message--file {
          border-top-left-radius: 0;
        }
      }

      &.sent {
        .sc-message--text, .sc-message--file {
          border-top-right-radius: 0;
        }
      }
    }
  }
</style>