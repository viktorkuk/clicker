/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/click.js":
/*!*******************************!*\
  !*** ./resources/js/click.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function () {\n  var clicksTable = $('#clicks-table').DataTable({\n    \"ajax\": {\n      \"url\": \"/api/clicks/\",\n      \"dataSrc\": \"\"\n    },\n    \"columns\": [{\n      \"data\": \"id\"\n    }, {\n      \"data\": \"ua\"\n    }, {\n      \"data\": \"ip\"\n    }, {\n      \"data\": \"ref\"\n    }, {\n      \"data\": \"param1\"\n    }, {\n      \"data\": \"param2\"\n    }, {\n      \"data\": \"error\"\n    }, {\n      \"data\": \"bad_domain\"\n    }]\n  });\n  var domainTable = $('#domain-table').DataTable({\n    \"ajax\": {\n      \"url\": \"/api/domains/\",\n      \"dataSrc\": \"\"\n    },\n    \"columns\": [{\n      \"data\": \"id\"\n    }, {\n      \"data\": \"name\"\n    }, {\n      \"data\": null,\n      \"defaultContent\": '<button type=\"button\" name=\"delete\" class=\"btn btn-danger btn-xs delete\">Delete</button>',\n      \"className\": 'dt-body-right',\n      \"orderable\": false\n    }]\n  });\n  setInterval(function () {\n    clicksTable.ajax.reload(null, false);\n  }, 5000);\n  $('#addDomain').click(function () {\n    $('#domainModal').modal('show');\n    $('#recordForm')[0].reset();\n    $('.modal-title').html(\"<i class='fa fa-plus'></i> Add Domain\");\n    $('#action').val('addRecord');\n    $('#save').val('Add');\n  });\n  $(\"#domainModal\").on('submit', '#domainForm', function (event) {\n    event.preventDefault();\n    $('#save').attr('disabled', 'disabled');\n    var formData = $(this).serialize();\n    $.ajax({\n      url: \"/api/domain\",\n      method: \"POST\",\n      data: formData,\n      success: function success(data) {\n        $('#domainForm')[0].reset();\n        $('#domainModal').modal('hide');\n        $('#save').attr('disabled', false);\n        domainTable.ajax.reload(null, false);\n      }\n    });\n  });\n  $(\"#domain-table\").on('click', '.delete', function () {\n    var id = domainTable.row($(this).parents('tr')).data().id;\n\n    if (confirm(\"Are you sure you want to delete this domain?\")) {\n      $.ajax({\n        url: \"/api/domain/\" + id,\n        method: \"DELETE\",\n        success: function success(data) {\n          domainTable.ajax.reload(null, false);\n        }\n      });\n    } else {\n      return false;\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY2xpY2suanM/YTllOCJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrc1RhYmxlIiwiRGF0YVRhYmxlIiwiZG9tYWluVGFibGUiLCJzZXRJbnRlcnZhbCIsImFqYXgiLCJyZWxvYWQiLCJjbGljayIsIm1vZGFsIiwicmVzZXQiLCJodG1sIiwidmFsIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXR0ciIsImZvcm1EYXRhIiwic2VyaWFsaXplIiwidXJsIiwibWV0aG9kIiwiZGF0YSIsInN1Y2Nlc3MiLCJpZCIsInJvdyIsInBhcmVudHMiLCJjb25maXJtIl0sIm1hcHBpbmdzIjoiQUFBQUEsQ0FBQyxDQUFDQyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFXO0FBQ3pCLE1BQU1DLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQkksU0FBbkIsQ0FBOEI7QUFDOUMsWUFBUTtBQUNKLGFBQU8sY0FESDtBQUVKLGlCQUFXO0FBRlAsS0FEc0M7QUFNOUMsZUFBVyxDQUNQO0FBQUUsY0FBUTtBQUFWLEtBRE8sRUFFUDtBQUFFLGNBQVE7QUFBVixLQUZPLEVBR1A7QUFBRSxjQUFRO0FBQVYsS0FITyxFQUlQO0FBQUUsY0FBUTtBQUFWLEtBSk8sRUFLUDtBQUFFLGNBQVE7QUFBVixLQUxPLEVBTVA7QUFBRSxjQUFRO0FBQVYsS0FOTyxFQU9QO0FBQUUsY0FBUTtBQUFWLEtBUE8sRUFRUDtBQUFFLGNBQVE7QUFBVixLQVJPO0FBTm1DLEdBQTlCLENBQXBCO0FBa0JBLE1BQU1DLFdBQVcsR0FBR0wsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQkksU0FBbkIsQ0FBOEI7QUFDOUMsWUFBUTtBQUNKLGFBQU8sZUFESDtBQUVKLGlCQUFXO0FBRlAsS0FEc0M7QUFLOUMsZUFBVyxDQUNQO0FBQUUsY0FBUTtBQUFWLEtBRE8sRUFFUDtBQUFFLGNBQVE7QUFBVixLQUZPLEVBR1A7QUFDSSxjQUFRLElBRFo7QUFFSSx3QkFBa0IsMEZBRnRCO0FBR0ksbUJBQWEsZUFIakI7QUFJSSxtQkFBWTtBQUpoQixLQUhPO0FBTG1DLEdBQTlCLENBQXBCO0FBaUJBRSxhQUFXLENBQUUsWUFBWTtBQUNyQkgsZUFBVyxDQUFDSSxJQUFaLENBQWlCQyxNQUFqQixDQUF3QixJQUF4QixFQUE4QixLQUE5QjtBQUNILEdBRlUsRUFFUixJQUZRLENBQVg7QUFJQVIsR0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQlMsS0FBaEIsQ0FBc0IsWUFBVTtBQUM1QlQsS0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQlUsS0FBbEIsQ0FBd0IsTUFBeEI7QUFDQVYsS0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQixDQUFqQixFQUFvQlcsS0FBcEI7QUFDQVgsS0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQlksSUFBbEIsQ0FBdUIsdUNBQXZCO0FBQ0FaLEtBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYWEsR0FBYixDQUFpQixXQUFqQjtBQUNBYixLQUFDLENBQUMsT0FBRCxDQUFELENBQVdhLEdBQVgsQ0FBZSxLQUFmO0FBQ0gsR0FORDtBQVFBYixHQUFDLENBQUMsY0FBRCxDQUFELENBQWtCYyxFQUFsQixDQUFxQixRQUFyQixFQUE4QixhQUE5QixFQUE2QyxVQUFTQyxLQUFULEVBQWU7QUFDeERBLFNBQUssQ0FBQ0MsY0FBTjtBQUNBaEIsS0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXaUIsSUFBWCxDQUFnQixVQUFoQixFQUEyQixVQUEzQjtBQUNBLFFBQUlDLFFBQVEsR0FBR2xCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUW1CLFNBQVIsRUFBZjtBQUNBbkIsS0FBQyxDQUFDTyxJQUFGLENBQU87QUFDSGEsU0FBRyxFQUFDLGFBREQ7QUFFSEMsWUFBTSxFQUFDLE1BRko7QUFHSEMsVUFBSSxFQUFDSixRQUhGO0FBSUhLLGFBQU8sRUFBQyxpQkFBU0QsSUFBVCxFQUFjO0FBQ2xCdEIsU0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQixDQUFqQixFQUFvQlcsS0FBcEI7QUFDQVgsU0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQlUsS0FBbEIsQ0FBd0IsTUFBeEI7QUFDQVYsU0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXaUIsSUFBWCxDQUFnQixVQUFoQixFQUE0QixLQUE1QjtBQUNBWixtQkFBVyxDQUFDRSxJQUFaLENBQWlCQyxNQUFqQixDQUF3QixJQUF4QixFQUE4QixLQUE5QjtBQUNIO0FBVEUsS0FBUDtBQVdILEdBZkQ7QUFpQkFSLEdBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJjLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFNBQS9CLEVBQTBDLFlBQVU7QUFDaEQsUUFBSVUsRUFBRSxHQUFHbkIsV0FBVyxDQUFDb0IsR0FBWixDQUFpQnpCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTBCLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBakIsRUFBeUNKLElBQXpDLEdBQWdERSxFQUF6RDs7QUFDQSxRQUFHRyxPQUFPLENBQUMsOENBQUQsQ0FBVixFQUE0RDtBQUN4RDNCLE9BQUMsQ0FBQ08sSUFBRixDQUFPO0FBQ0hhLFdBQUcsRUFBQyxpQkFBZUksRUFEaEI7QUFFSEgsY0FBTSxFQUFDLFFBRko7QUFHSEUsZUFBTyxFQUFDLGlCQUFTRCxJQUFULEVBQWU7QUFDbkJqQixxQkFBVyxDQUFDRSxJQUFaLENBQWlCQyxNQUFqQixDQUF3QixJQUF4QixFQUE4QixLQUE5QjtBQUNIO0FBTEUsT0FBUDtBQU9ILEtBUkQsTUFRTztBQUNILGFBQU8sS0FBUDtBQUNIO0FBQ0osR0FiRDtBQWVILENBaEZEIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL2NsaWNrLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgY2xpY2tzVGFibGUgPSAkKCcjY2xpY2tzLXRhYmxlJykuRGF0YVRhYmxlKCB7XG4gICAgICAgIFwiYWpheFwiOiB7XG4gICAgICAgICAgICBcInVybFwiOiBcIi9hcGkvY2xpY2tzL1wiLFxuICAgICAgICAgICAgXCJkYXRhU3JjXCI6IFwiXCJcbiAgICAgICAgfSxcblxuICAgICAgICBcImNvbHVtbnNcIjogW1xuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJpZFwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcInVhXCIgfSxcbiAgICAgICAgICAgIHsgXCJkYXRhXCI6IFwiaXBcIiB9LFxuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJyZWZcIiB9LFxuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJwYXJhbTFcIiB9LFxuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJwYXJhbTJcIiB9LFxuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJlcnJvclwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcImJhZF9kb21haW5cIiB9XG4gICAgICAgIF1cbiAgICB9ICk7XG5cbiAgICBjb25zdCBkb21haW5UYWJsZSA9ICQoJyNkb21haW4tdGFibGUnKS5EYXRhVGFibGUoIHtcbiAgICAgICAgXCJhamF4XCI6IHtcbiAgICAgICAgICAgIFwidXJsXCI6IFwiL2FwaS9kb21haW5zL1wiLFxuICAgICAgICAgICAgXCJkYXRhU3JjXCI6IFwiXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb2x1bW5zXCI6IFtcbiAgICAgICAgICAgIHsgXCJkYXRhXCI6IFwiaWRcIiB9LFxuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJuYW1lXCIgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogbnVsbCxcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRDb250ZW50XCI6ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBuYW1lPVwiZGVsZXRlXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4teHMgZGVsZXRlXCI+RGVsZXRlPC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBcImNsYXNzTmFtZVwiOiAnZHQtYm9keS1yaWdodCcsXG4gICAgICAgICAgICAgICAgXCJvcmRlcmFibGVcIjpmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSApO1xuXG4gICAgc2V0SW50ZXJ2YWwoIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xpY2tzVGFibGUuYWpheC5yZWxvYWQobnVsbCwgZmFsc2UgKTtcbiAgICB9LCA1MDAwICk7XG5cbiAgICAkKCcjYWRkRG9tYWluJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJCgnI2RvbWFpbk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgJCgnI3JlY29yZEZvcm0nKVswXS5yZXNldCgpO1xuICAgICAgICAkKCcubW9kYWwtdGl0bGUnKS5odG1sKFwiPGkgY2xhc3M9J2ZhIGZhLXBsdXMnPjwvaT4gQWRkIERvbWFpblwiKTtcbiAgICAgICAgJCgnI2FjdGlvbicpLnZhbCgnYWRkUmVjb3JkJyk7XG4gICAgICAgICQoJyNzYXZlJykudmFsKCdBZGQnKTtcbiAgICB9KTtcblxuICAgICQoXCIjZG9tYWluTW9kYWxcIikub24oJ3N1Ym1pdCcsJyNkb21haW5Gb3JtJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywnZGlzYWJsZWQnKTtcbiAgICAgICAgbGV0IGZvcm1EYXRhID0gJCh0aGlzKS5zZXJpYWxpemUoKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDpcIi9hcGkvZG9tYWluXCIsXG4gICAgICAgICAgICBtZXRob2Q6XCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOmZvcm1EYXRhLFxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICAkKCcjZG9tYWluRm9ybScpWzBdLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgJCgnI2RvbWFpbk1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICAkKCcjc2F2ZScpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIGRvbWFpblRhYmxlLmFqYXgucmVsb2FkKG51bGwsIGZhbHNlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAkKFwiI2RvbWFpbi10YWJsZVwiKS5vbignY2xpY2snLCAnLmRlbGV0ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBpZCA9IGRvbWFpblRhYmxlLnJvdyggJCh0aGlzKS5wYXJlbnRzKCd0cicpICkuZGF0YSgpLmlkO1xuICAgICAgICBpZihjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGRvbWFpbj9cIikpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOlwiL2FwaS9kb21haW4vXCIraWQsXG4gICAgICAgICAgICAgICAgbWV0aG9kOlwiREVMRVRFXCIsXG4gICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpblRhYmxlLmFqYXgucmVsb2FkKG51bGwsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59ICk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/click.js\n");

/***/ }),

/***/ 1:
/*!*************************************!*\
  !*** multi ./resources/js/click.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/resources/js/click.js */"./resources/js/click.js");


/***/ })

/******/ });