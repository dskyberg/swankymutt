import { useStrict, observable, action } from 'mobx'
import moment from 'moment'
import addrs from 'email-addresses'

useStrict()

const defaultTestDomains = [
    "socalredskins.com",
    "itrustgus.com"
]
const defaultTestEmails = [
    "aparnamachi@hotmail.com",
]

const defaultTestUsers = [
    'redcar',
    'test',
    'privo'
]

export class CommonStore {

    @observable drawerOpen = false
    @observable testDomains = []
    @observable testEmails = []
    @observable testUsers = []
    @observable partner = 2391
    @observable site = 12
    @observable startDate = moment("2017-11-01")

    constructor() {
        const response = this.getStorage()
        if (response) {
            this.testDomains = response['testDomains']
            this.testEmails = response['testEmails']
            this.testUsers = response['testUsers']
        } else {
            this.testDomains = defaultTestDomains
            this.testEmails = defaultTestEmails
            this.testUsers = defaultTestUsers
            this.putStorage()
        }
    }

    @action
    setTestDomains(testDomains) {
        this.testDomains = testDomains
        this.putStorage()
    }

    @action
    setTestEmails(testEmails) {
        this.testEmails = testEmails
        this.putStorage()
    }

    @action
    setTestUsers(testUsers) {
        this.testUsers = testUsers
        this.putStorage()
    }

    /**
     * This method can be used in array map/filter methods
     */
    isNotTesEmailOrDomain = (model) => {
        if (!model || model === null) {
            console.log('gIsNotTestMmailOrDomain: no model provided')
            return false
        }
        const { email } = model
        if (!email || email === '') {
            return true
        }
        if (this.testEmails.includes(email)) {
            return false
        }
        const { domain } = addrs.parseOneAddress(email)
        if (!domain || domain === null) {
            return true
        }
        if (this.testDomains.includes(domain)) {
            return false
        }
        return true
    }

    /**
     * This method can be used in array map/filter methods
     */
    isNotTestUser = (model) => {
        const { userName } = model
        if (!userName || userName === null || userName === '') {
            return true
        }
        for (var idx in this.testUsers) {
            const testUser = this.testUsers[idx]
            if (userName.includes(testUser)) {
                return false
            }
        }
        return true
    }


    @action('CommonStore.toggleDrawer')
    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen
    }

    getStorage() {
        const response = localStorage.getItem('commonStore')
        if (response && response !== null) {
            return JSON.parse(response)
        }
    }

    putStorage() {
        localStorage.setItem('commonStore', JSON.stringify({
            testDomains: this.testDomains.slice(),
            testEmails: this.testEmails.slice(),
            testUsers: this.testUsers.slice()
        }))
    }

    deleteStorage() {
        localStorage.removeItem('commonStore')
    }

}
export default new CommonStore()