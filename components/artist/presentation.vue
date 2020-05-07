<template>
  <div class="container">
    <header>
      <div class="horizontal middle">
        <avatar
          :src="presentation.contractor.photo"
          :username="presentation.contractor.name"
        ></avatar>
        <h5>{{ presentation.contractor.name }}</h5>
      </div>
      <span class="identifier">Proposta</span>
    </header>
    <div></div>
    <main>
      <perfect-scrollbar>
        <div>
          <h4>{{ presentation.title }}</h4>
        </div>
        <div class="boxed">
          <div class="horizontal middle">
            <h4>
              <font-awesome icon="calendar-alt"></font-awesome>
              {{ presentationDate }}
            </h4>
            <h5>{{ presentationTime }}</h5>
          </div>
          <div class="horizontal middle">
            <font-awesome icon="map-marker-alt"></font-awesome>
            <a :href="encodedMapsLocation" target="_blank">
              <h6>{{ presentation.location.display }}</h6>
            </a>
          </div>
        </div>
        <div>
          <span>{{ presentation.description }}</span>
        </div>
        <div class="boxed vertical">
          <div>
            <h5>{{ presentation.product.name }}</h5>
          </div>
          <div>
            <h6>
              <font-awesome icon="dollar-sign"></font-awesome>
              {{ presentation.product.price }}
            </h6>
          </div>
          <div>
            <h6>
              <font-awesome icon="clock"></font-awesome>
              {{ presentation.product.duration }}
              {{ $utils.pluralize('hora', presentation.product.duration) }}
            </h6>
          </div>
        </div>
        <div class="attachments">
          <attachment
            v-for="(file, index) in presentation.files"
            :key="index"
            :file="file"
          >
          </attachment>
        </div>
      </perfect-scrollbar>
    </main>
    <footer>
      <div class="mr-5">
        <submit-button :submit-callback="accept">Aceitar</submit-button>
      </div>
      <div>
        <h5 @click="reject">Recusar</h5>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import Attachment from '@/components/form/attachment'

export default {
  components: {
    attachment: Attachment
  },
  props: {
    callback: { type: Function, default: () => {} }
  },
  computed: {
    ...mapState({ presentation: (state) => state.event.presentation }),
    presentationTime() {
      return (
        moment(this.presentation.start_dt).format(this.$config.timeFormat) +
        ' - ' +
        moment(this.presentation.end_dt).format(this.$config.timeFormat)
      )
    },
    presentationDate() {
      return moment(this.presentation.start_dt).format(this.$config.dateFormat)
    },
    encodedMapsLocation() {
      return encodeURI(
        `http://maps.google.com/maps?q=${this.presentation.location.display}`
      )
    }
  },
  methods: {
    ...mapActions('event', ['acceptpresentation', 'rejectpresentation']),
    async accept() {
      try {
        await this.acceptpresentation(this.presentation.id)
      } catch (error) {
      } finally {
        this.callback()
      }
    },
    async reject() {
      try {
        await this.rejectpresentation(this.presentation.id)
      } catch (error) {
      } finally {
        this.callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @extend .vertical;
  padding: 10px;
  max-height: 100%;
  position: relative;

  .identifier {
    text-transform: uppercase;
    letter-spacing: $space / 2;
    color: $bg3;
    padding-right: 10 * $space;
    font-weight: $bold;
    border-bottom: 5px solid $bg3;
    border-radius: rounded;
  }

  header {
    @extend .horizontal, .middle;
    justify-content: space-between;
    width: 100%;

    .vue-avatar--wrapper {
      margin-right: 2 * $space;
    }
  }

  main {
    @extend .vertical;
    margin-top: 2 * $space;
    margin-bottom: 2 * $space;
    padding: 2 * $space;
    box-shadow: $shadow;
    background: $bg3;
    border-radius: $edges;
    width: 100%;
    max-height: 60vh;

    [data-icon] {
      font-size: $large;
      font-weight: $bold;
      color: $brand;
    }

    div {
      margin-bottom: 3 * $space;
    }

    .boxed {
      background: $bg4;
      border-radius: $edges;
      padding: 2 * $space;
      margin-left: 3 * $space;
      margin-right: 3 * $space;

      h6 {
        margin-right: 5 * $space;
      }
    }

    .attachments {
      @extend .horizontal, .middle;
      flex-wrap: wrap;
    }
  }

  footer {
    @extend .horizontal, .center, .middle;
    margin-top: $space;

    h5 {
      color: transparentize($brand, 0.2);
      cursor: pointer;
      transition: $transition;

      &:hover {
        transition: $transition;
        color: $brand;
      }
    }
  }

  h4 {
    margin-right: 4 * $space;
    padding-right: 4 * $space;
    border-right: 5px solid $darkComponent;
  }
}
</style>
