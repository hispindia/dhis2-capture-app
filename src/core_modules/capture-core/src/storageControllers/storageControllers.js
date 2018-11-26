// @flow
import StorageController from 'capture-core-utils/storage/StorageController';
import IndexedDBAdapter from 'capture-core-utils/storage/IndexedDBAdapter';
import LocalStorageAdapter from 'capture-core-utils/storage/DomLocalStorageAdapter';
import createUserStorageController from './userStorageController';
import createMainStorageController from './mainStorageController';
import { reduxPersistStores } from './stores/index';

const MAIN_STORAGE_KEY = 'dhis2ca';

const adapterTypes = [IndexedDBAdapter, LocalStorageAdapter];
const storageControllers: { [key: string]: StorageController } = {};

function initUserControllerAsync(adapterType: typeof IndexedDBAdapter | typeof LocalStorageAdapter) {
    const userStorageController = createUserStorageController(MAIN_STORAGE_KEY, [adapterType]);
    storageControllers.user = userStorageController;

    let upgradeTempData;
    return userStorageController.open(
        storage => storage
            .get(reduxPersistStores.REDUX_PERSIST, 'reduxPersist:offline')
            .then((data) => {
                upgradeTempData = data;
            }),
        (storage) => {
            if (!upgradeTempData) {
                return null;
            }
            return storage
                .set(reduxPersistStores.REDUX_PERSIST, upgradeTempData);
        },
    );
}

function initMainControllerAsync() {
    const mainStorageController = createMainStorageController(MAIN_STORAGE_KEY, adapterTypes);
    storageControllers.main = mainStorageController;
    return mainStorageController.open();
}

export function initAsync() {
    const mainPromise = initMainControllerAsync();
    const userPromise = initUserControllerAsync(storageControllers.main.adapterType);
    return Promise.all([mainPromise, userPromise]);
}

export function closeAsync() {
    const mainPromise = storageControllers.main.close();
    const userPromise = storageControllers.user.close();
    return Promise.all([mainPromise, userPromise]);
}

export function getMainController() {
    return storageControllers.main;
}

export function getUserController() {
    return storageControllers.user;
}