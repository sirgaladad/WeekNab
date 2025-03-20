const emit = defineEmits(['showLoginModal']);

const handleExit = () => {
  router.push('/');
};

const handleTryNow = () => {
  emit('showLoginModal');
}; 