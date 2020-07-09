<style lang="scss" scoped>
h6 {
  margin-left: 5 * $space;
}

.menu-items {
  @include desktop {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
  }

  @include mobile {
    h6 {
      font-size: $huge;
      margin-bottom: 2 * $space;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
