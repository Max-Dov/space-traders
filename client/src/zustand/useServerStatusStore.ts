import {create} from 'zustand';

const useServerStatusStore = create(() => ({
    status: 'offline'
}))