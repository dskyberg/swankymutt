import { useStrict, observable, action, computed, runInAction } from 'mobx'

useStrict()

export class AuthStore {

    @observable userName = ''
    @observable password = ''
    @observable authenticated = false
    @observable drawerOpen = false
    @observable inProgress = false


    @computed
    get isAuthenticated() {
        return this.authenticated
    }


    @action
    login() {
        this.inProgress = true
        return new Promise((resolve, reject) => {
            setTimeout(() => runInAction(() => {
                this.authenticated = true
                this.inProgress = false
                resolve(true)
            }), 1.0 * 1000)
        })
    }

    @action
    logout() {
        this.inProgress = true
        return new Promise((resolve, reject) => {
            setTimeout(() => runInAction(() => {
                this.authenticated = false
                this.inProgress = false
                resolve(true)
            }), 1.0 * 1000)
        })
    }

    @action('CommonStore.toggleDrawer')
    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen
    }

}
export default new AuthStore()