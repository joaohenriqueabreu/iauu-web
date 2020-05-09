<template>
  <div>
    <form class="container">
      <main>
        <div class="horizontal middle">
          <h4 class="h-bar">{{ timeslot.date }}</h4>
          <h6>
            Deseja tornar essa data indisponível?
          </h6>
        </div>
        <div class="horizontal middle mb-4">
          <form-input
            v-model="timeslot.start_time"
            :disabled="timeslot.full_day"
            type="time"
          ></form-input>
          <span class="space"></span>
          <form-input
            v-model="timeslot.end_time"
            type="time"
            :disabled="timeslot.full_day"
          ></form-input>
        </div>
        <div class="horizontal middle">
          <div class="horizontal middle center">
            <form-toggle v-model="timeslot.full_day">Dia inteiro?</form-toggle>
          </div>
          <span class="space"></span>
          <form-select
            v-model="timeslot.frequency"
            :options="repeatOptions"
          ></form-select>
        </div>
      </main>
      <footer>
        <submit-button @submit="submit">Salvar</submit-button>
      </footer>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Timeslot from '@/models/timeslot'
export default {
  props: {
    default: { type: String, default: '' }
  },
  data() {
    return {
      timeslot: { type: Timeslot, default: new Timeslot() }
    }
  },
  computed: {
    repeatOptions() {
      return ['Não repete', 'Toda semana', 'Todo mês']
    }
  },
  mounted() {
    this.timeslot = new Timeslot({
      type: 'unavailable',
      start_time: this.moment(this.default)
        .hour(8)
        .format('HH:mm'),
      end_time: this.moment(this.default)
        .hour(18)
        .format('HH:mm'),
      date: this.moment(this.default).format('DD/MM/YYYY')
    })
  },
  methods: {
    ...mapActions('schedule', ['saveTimeslot']),
    async submit() {
      try {
        await this.saveTimeslot(this.timeslot)
      } catch (error) {
      } finally {
        this.$emit('save')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;

  .date-range-area {
    @extend .horizontal, .middle;
    width: 50%;
    height: 100%;
  }

  .space {
    padding-right: 2 * $space;
  }
}

h4 {
  margin-right: 4 * $space;
  padding-right: 4 * $space;
  border-right: 5px solid $layer3;
}

main {
  @extend .vertical, .middle, .center;
  padding-top: 2 * $space;
}

footer {
  @extend .horizontal, .center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding-bottom: 2 * $space;
  div {
    width: 30%;
  }
}
</style>
