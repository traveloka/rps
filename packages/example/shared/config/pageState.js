import SnackbarError from '../components/Snackbar/Error';
import SnackbarSuccess from '../components/Snackbar/Success';

import PageLoading from '../components/Page/Loading';
import PageError from '../components/Page/Error';

import ModalLoading from '../components/Modal/Loading';

const config = {
  page: {
    loading: PageLoading,
    error: PageError,
  },
  modal: {
    loading: ModalLoading,
  },
  snackbar: {
    error: SnackbarError,
    success: SnackbarSuccess,
  },
}

export default config;