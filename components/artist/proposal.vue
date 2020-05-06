<template>
  <div class="container">
    <header>
      <div class="horizontal middle">
        <avatar
          :src="proposal.contractor.photo"
          :username="proposal.contractor.name"
        ></avatar>
        <h5>{{ proposal.contractor.name }}</h5>
      </div>
      <span class="identifier">Proposta</span>
    </header>
    <div></div>
    <main>
      <perfect-scrollbar>
        <div>
          <h4>{{ proposal.title }}</h4>
        </div>
        <div class="boxed">
          <div class="horizontal middle">
            <h4>
              <font-awesome icon="calendar"></font-awesome>
              {{ presentationDate }}
            </h4>
            <h5>{{ presentationTime }}</h5>
          </div>
          <div class="horizontal middle">
            <font-awesome icon="map-marker-alt"></font-awesome>
            <a :href="encodedMapsLocation" target="_blank">
              <h6>{{ proposal.location.display }}</h6>
            </a>
          </div>
        </div>
        <div>
          <span>{{ proposal.description }}</span>
        </div>
        <div class="boxed vertical">
          <div>
            <h5>{{ proposal.product.name }}</h5>
          </div>
          <div>
            <h6>
              <font-awesome icon="dollar-sign"></font-awesome>
              {{ proposal.product.price }}
            </h6>
          </div>
          <div>
            <h6>
              <font-awesome icon="clock"></font-awesome>
              {{ proposal.product.duration }}
              {{ $utils.pluralize('hora', proposal.product.duration) }}
            </h6>
          </div>
        </div>
        <div class="attachments">
          <attachment
            v-for="(file, index) in proposal.files"
            :key="index"
            :file="file"
          >
          </attachment>
        </div>
      </perfect-scrollbar>
    </main>
    <footer>
      <div class="mr-5">
        <submit-button>Aceitar</submit-button>
      </div>
      <div>
        <h5>Rejeitar</h5>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Attachment from '@/components/form/attachment'

export default {
  components: {
    attachment: Attachment
  },
  computed: {
    ...mapState({ proposal: (state) => state.event.proposal }),
    presentationTime() {
      return (
        moment(this.proposal.start_dt).format(this.$config.timeFormat) +
        ' - ' +
        moment(this.proposal.end_dt).format(this.$config.timeFormat)
      )
    },
    presentationDate() {
      return moment(this.proposal.start_dt).format(this.$config.dateFormat)
    },
    encodedMapsLocation() {
      return encodeURI(
        `http://maps.google.com/maps?q=${this.proposal.location.display}`
      )
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
