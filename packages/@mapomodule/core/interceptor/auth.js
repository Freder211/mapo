module.exports = ({ $axios, store }) => {
    if ($axios && store){
        $axios.onRequest((config) => {
            const token = store.getters['mapo/user/token']
            if (token && token !== 'undefined') {
                config.headers['Authorization'] = `Token ${token}`
            }
            return config
        })
    
        $axios.onResponse((response) => {
            if (response.status === 401) {
                store.dispatch('mapo/user/logout');
            }
            return response
        })
    
        $axios.onError((error) => {
            const { status } = error.response || {}
            if (status === 401) {
                store.dispatch('mapo/user/logout');
            }
            return Promise.reject(error)
        })
    }
}