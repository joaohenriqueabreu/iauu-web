<script>
import { mapState } from 'vuex'
import PresentationAddress from '@/components/presentation/address'
import PickTimeslot from '@/components/presentation/timeslot'
import PresentationDetails from '@/components/presentation/details'
import PresentationDate from '@/components/presentation/date'
import PresentationProduct from '@/components/presentation/product'
import PresentationPrice from '@/components/presentation/price'
import CounterOffer from '@/components/presentation/counterOffer'

export default {
  components: {
    PickTimeslot,
    PresentationAddress,
    PresentationDate,
    PresentationProduct,
    PresentationPrice,
    CounterOffer,
  },
  computed: {
    ...mapState({ presentation: (state) => state.presentation.presentation })
  },
}
</script>

<style lang="scss">
.boxed {
  @extend .vertical, .middle;
  text-align: left;
  background: $layer4;
  border-radius: $edges;
  padding: 2 * $space;
  margin-left: 3 * $space;
  margin-right: 3 * $space;

  h6 {
    margin-right: 5 * $space;
  }

  h4 {
    margin-right: 4 * $space;
    padding-right: 4 * $space;
    border-right: 5px solid $layer3;
  }

  .position-absolute {
    @extend .vertical, .middle, .center;
    transition: $transition;
    top: 5px;
    right: 5px;
    padding: 5px;
    width: 30px;
    height: 30px;
    border-radius: $rounded;
    box-shadow: $shadow;
    background: $layer5;
    color: $brand;
    padding-left: 18px;
    cursor: pointer;
    &:hover {
      transition: $transition;
      background: $brand;
      color: $layer5;
    }
  }
}
</style>