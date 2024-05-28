<template>
  <NuxtLayout>
    <AppContainer>
      <AppHeader />
      <PageContainer>
        <NuxtPage />
      </PageContainer>
    </AppContainer>
  </NuxtLayout>
</template>

<script>
import AppContainer from '~/layouts/AppContainer.vue'
import AppHeader from '~/components/AppHeader.vue'
import PageContainer from '~/layouts/PageContainer.vue'

export default {
  components: {
    AppContainer,
    AppHeader,
    PageContainer,
  },
}
</script>
