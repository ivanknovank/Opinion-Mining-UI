function LocalStorageManage() {
	let opinionDataSet =
		JSON.parse(localStorage.getItem('opinionDataSet'));
    if(opinionDataSet === null) {
        localStorage.setItem('opinionDataSet', JSON.stringify([]));
        opinionDataSet = [];
        localStorage.setItem("opinionResult", JSON.stringify([]));
        localStorage.setItem("idOpinionUpdate", JSON.stringify([]));
    }

	let opinionResult = JSON.parse(localStorage.getItem('opinionResult'));
    if(opinionResult === null) {
        opinionResult = [];
        localStorage.setItem("opinionResult", JSON.stringify([]));
    }

    let upToDate = JSON.parse(localStorage.getItem('upToDate'));
    if(upToDate === null) {
        upToDate = true;
        localStorage.setItem('upToDate', JSON.stringify(true));
    }

    let idOpinionUpdate = JSON.parse(localStorage.getItem('idOpinionUpdate'));
    if(idOpinionUpdate === null) {
        idOpinionUpdate = [];
        localStorage.setItem("idOpinionUpdate", JSON.stringify([]));
    }

	this.setOpinions = opinions => {
        // console.log(upToDate)
		const _opinions = opinions.sort((a, b) => a.id - b.id);
		localStorage.setItem('opinionDataSet', JSON.stringify(_opinions));
        this.setUpToDate(false);
        opinionDataSet = _opinions;
	};

    this.setResult = results => {
        const _result = results.sort((a, b) => a.id - b.id);
        localStorage.setItem("opinionResult", JSON.stringify(_result));
        opinionResult = _result
    }
    this.setUpToDate = status => {
        upToDate = status;
        localStorage.setItem('upToDate', JSON.stringify(upToDate));
    }

    this.addIdUpdate = (ids) => {
        idOpinionUpdate.push(""+ids);
        localStorage.setItem("idOpinionUpdate", JSON.stringify(idOpinionUpdate.sort()));
    }
    this.setIdUpdate = (arr) => {
        idOpinionUpdate = arr;
        localStorage.setItem("idOpinionUpdate", JSON.stringify(idOpinionUpdate.sort()));
    }

    this.clearData = () => {
        opinionDataSet = [];
        opinionResult = [];
        idOpinionUpdate = [];
        upToDate = true;
        localStorage.setItem('opinionDataSet', JSON.stringify([]));
        localStorage.setItem("opinionResult", JSON.stringify([]));
        localStorage.setItem("idOpinionUpdate", JSON.stringify([]));
        localStorage.setItem('upToDate', JSON.stringify(true));

    }

	this.getOpinionData = () => [...opinionDataSet];

	this.getOpinionResult = () => [...opinionResult];

    this.getUpToDate = () => upToDate;

    this.getIdUpdate = () => [...idOpinionUpdate];

    // this.clear
}

export default new LocalStorageManage();
