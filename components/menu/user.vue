<style lang="scss" scoped>
h6 {
  margin-left: 5 * $space;
}

.menu-items {
  justify-content: flex-end;
  align-items: flex-end;
  @include desktop {
    display: flex;
    flex-direction: row;
  }

  @include mobile {
    display: flex;
    flex-direction: column;
  }
}
</style>
