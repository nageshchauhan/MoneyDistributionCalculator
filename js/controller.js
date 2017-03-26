(function () {
	'use strict';
	angular.module('moneyDistributionCalc', []);

	angular.module('moneyDistributionCalc').controller('distributionCalcController',['$scope',function($scope){
		$scope.masterList=[];
		$scope.addConti=function(){
			if(!$scope.contiName){
				alert("Contributor name is mandatory");
				return;
			}
			if(!(!isNaN(parseFloat($scope.contiAmt)) && isFinite($scope.contiAmt))){
				alert("Invalid number");
				return;
			}
			console.log("Add conti called");
			$scope.tempObj={};
			$scope.tempObj.contiName=$scope.contiName;
			$scope.tempObj.contiAmt=Number($scope.contiAmt);
			$scope.tempObj.desc=$scope.desc;
			$scope.masterList.push($scope.tempObj);
			$scope.contiName=null;
			$scope.contiAmt=null;
			$scope.desc=null;
			var totalAmt=0;
			$scope.totalAmt=0;
			$scope.masterList.forEach(function(d){
				totalAmt+=d.contiAmt;
			});
			
			$scope.totalAmt=totalAmt;
		}
		$scope.distributeAmt=function(){
			$scope.masterList.map(function(d){
				var balance = parseFloat( ($scope.totalAmt / $scope.masterList.length ) - d.contiAmt).toFixed(2);
				if(balance>0){
					d.balance=balance+' Dr';
				}else{
					d.balance=balance+' Cr';
				}
			});
			if($scope.page1){
				$scope.page1=false;
			}else{
				$scope.page1=true;
			}
		};

		$scope.removeItem=function(item){
			var index = $scope.masterList.indexOf(item);
			$scope.masterList.splice(index,1);
			$scope.totalAmt=0;
			$scope.masterList.forEach(function(d){
				$scope.totalAmt+=d.contiAmt;
			});
		};
	}]);
})();

