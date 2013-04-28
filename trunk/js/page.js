(function(){
	$(function(){
		checkLocalStoreage();
		if (typeof(localStorage.module) === "undefined") {
	        localStorage.module = 'direct';
	    }
		initClick();
	});
	function checkLocalStoreage(){
		console.log(localStorage.module);
		if (typeof(localStorage.module) === "undefined") {
	        localStorage.module = 'direct';
	    }
		$("#module_"+localStorage.module).attr("checked","checked");
	}
	function initClick() {
		changeProxy(localStorage.module);
		$("input[name=module]").change(function(){
			$this = $(this);
			changeProxy($this.val());
			var notification = webkitNotifications.createNotification('', '提醒', '设置代理成功!');
	    	notification.show();
	    	setTimeout(function(){
	    		notification.close();
	    	}, 1000);
		});
	}
	function changeProxy(module) {
		console.log(module);
		if (module == "direct") {
			setProxy(direct_confit);
		} else if (module == "gae") {
			setProxy(gae_config);
		} else if (module == "proxy") {
			setProxy(fixed_config);
		}
		localStorage.module = module;
	}
	function setProxy(config) {
		console.log(config);
		chrome.proxy.settings.set({value: config, scope: 'regular'},
			    function(config) {
			    }
		);
	}
	var passList = ["*.baidu.com"];
	var gae_servers = [
 	          {scheme:"http",host:"114.80.208.195",port:8433}
	      ];
	var proxy_servers = [
	          {scheme:"http",host:"207.177.47.178",port:80}
	      ];
	var gae_config = {
		mode: "fixed_servers",
		rules: {
			singleProxy    : gae_servers[0],
			bypassList: passList
		}
	};
	var fixed_config = {
		mode: "fixed_servers",
		rules: {
			singleProxy    : proxy_servers[0],
			bypassList: passList
		}
	};
	var direct_confit = {
		mode : "direct"
	};
}());