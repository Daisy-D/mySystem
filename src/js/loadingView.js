import store from "../store/store.js";
const loadingView = {};
let loadingNum = 0;

loadingView.show =function(){
    loadingNum++;
    store.state.isLoadingShow=true;
}
loadingView.hide =function(){
    loadingNum--;
    if(loadingNum<=0){
        store.state.isLoadingShow=false;
    }
}

window.loadingView = loadingView;
export default loadingView;
