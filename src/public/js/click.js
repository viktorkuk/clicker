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

eval("$(document).ready(function () {\n  var clicksTable = $('#clicks-table').DataTable({\n    \"ajax\": {\n      \"url\": \"/api/clicks/\",\n      \"dataSrc\": \"\"\n    },\n    \"columns\": [{\n      \"data\": \"id\"\n    }, {\n      \"data\": \"ua\"\n    }, {\n      \"data\": \"ip\"\n    }, {\n      \"data\": \"ref\"\n    }, {\n      \"data\": \"param1\"\n    }, {\n      \"data\": \"param2\"\n    }, {\n      \"data\": \"error\"\n    }, {\n      \"data\": \"bad_domain\"\n    }]\n  });\n  var domainTable = $('#domain-table').DataTable({\n    \"ajax\": {\n      \"url\": \"/api/domains/\",\n      \"dataSrc\": \"\"\n    },\n    \"columns\": [{\n      \"data\": \"id\"\n    }, {\n      \"data\": \"name\"\n    }, {\n      \"data\": null,\n      \"defaultContent\": '<button type=\"button\" name=\"delete\" class=\"btn btn-danger btn-xs delete\">Delete</button>',\n      \"className\": 'dt-body-right',\n      \"orderable\": false\n    }]\n  });\n  setInterval(function () {\n    clicksTable.ajax.reload(null, false);\n  }, 5000);\n  $('#addDomain').click(function () {\n    $('#domainModal').modal('show');\n    $('#recordForm')[0].reset();\n    $('.modal-title').html(\"<i class='fa fa-plus'></i> Add Domain\");\n    $('#action').val('addRecord');\n    $('#save').val('Add');\n  });\n  $(\"#domainModal\").on('submit', '#domainForm', function (event) {\n    event.preventDefault();\n    $('#save').attr('disabled', 'disabled');\n    var formData = $(this).serialize();\n    $.ajax({\n      url: \"/api/domain\",\n      method: \"POST\",\n      data: formData,\n      success: function success(data) {\n        resetForm();\n        domainTable.ajax.reload(null, false);\n      },\n      error: function error() {\n        resetForm();\n        alert(\"Add error\");\n      }\n    });\n  });\n  $(\"#domain-table\").on('click', '.delete', function () {\n    var id = domainTable.row($(this).parents('tr')).data().id;\n\n    if (confirm(\"Are you sure you want to delete this domain?\")) {\n      $.ajax({\n        url: \"/api/domain/\" + id,\n        method: \"DELETE\",\n        success: function success(data) {\n          resetForm();\n          domainTable.ajax.reload(null, false);\n        },\n        error: function error() {\n          resetForm();\n          alert(\"Delete error\");\n        }\n      });\n    } else {\n      return false;\n    }\n  });\n\n  var resetForm = function resetForm() {\n    $('#domainForm')[0].reset();\n    $('#domainModal').modal('hide');\n    $('#save').attr('disabled', false);\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY2xpY2suanM/YTllOCJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrc1RhYmxlIiwiRGF0YVRhYmxlIiwiZG9tYWluVGFibGUiLCJzZXRJbnRlcnZhbCIsImFqYXgiLCJyZWxvYWQiLCJjbGljayIsIm1vZGFsIiwicmVzZXQiLCJodG1sIiwidmFsIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXR0ciIsImZvcm1EYXRhIiwic2VyaWFsaXplIiwidXJsIiwibWV0aG9kIiwiZGF0YSIsInN1Y2Nlc3MiLCJyZXNldEZvcm0iLCJlcnJvciIsImFsZXJ0IiwiaWQiLCJyb3ciLCJwYXJlbnRzIiwiY29uZmlybSJdLCJtYXBwaW5ncyI6IkFBQUFBLENBQUMsQ0FBQ0MsUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBVztBQUN6QixNQUFNQyxXQUFXLEdBQUdILENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJJLFNBQW5CLENBQThCO0FBQzlDLFlBQVE7QUFDSixhQUFPLGNBREg7QUFFSixpQkFBVztBQUZQLEtBRHNDO0FBTTlDLGVBQVcsQ0FDUDtBQUFFLGNBQVE7QUFBVixLQURPLEVBRVA7QUFBRSxjQUFRO0FBQVYsS0FGTyxFQUdQO0FBQUUsY0FBUTtBQUFWLEtBSE8sRUFJUDtBQUFFLGNBQVE7QUFBVixLQUpPLEVBS1A7QUFBRSxjQUFRO0FBQVYsS0FMTyxFQU1QO0FBQUUsY0FBUTtBQUFWLEtBTk8sRUFPUDtBQUFFLGNBQVE7QUFBVixLQVBPLEVBUVA7QUFBRSxjQUFRO0FBQVYsS0FSTztBQU5tQyxHQUE5QixDQUFwQjtBQWtCQSxNQUFNQyxXQUFXLEdBQUdMLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJJLFNBQW5CLENBQThCO0FBQzlDLFlBQVE7QUFDSixhQUFPLGVBREg7QUFFSixpQkFBVztBQUZQLEtBRHNDO0FBSzlDLGVBQVcsQ0FDUDtBQUFFLGNBQVE7QUFBVixLQURPLEVBRVA7QUFBRSxjQUFRO0FBQVYsS0FGTyxFQUdQO0FBQ0ksY0FBUSxJQURaO0FBRUksd0JBQWtCLDBGQUZ0QjtBQUdJLG1CQUFhLGVBSGpCO0FBSUksbUJBQVk7QUFKaEIsS0FITztBQUxtQyxHQUE5QixDQUFwQjtBQWlCQUUsYUFBVyxDQUFFLFlBQVk7QUFDckJILGVBQVcsQ0FBQ0ksSUFBWixDQUFpQkMsTUFBakIsQ0FBd0IsSUFBeEIsRUFBOEIsS0FBOUI7QUFDSCxHQUZVLEVBRVIsSUFGUSxDQUFYO0FBSUFSLEdBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0JTLEtBQWhCLENBQXNCLFlBQVU7QUFDNUJULEtBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JVLEtBQWxCLENBQXdCLE1BQXhCO0FBQ0FWLEtBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsQ0FBakIsRUFBb0JXLEtBQXBCO0FBQ0FYLEtBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JZLElBQWxCLENBQXVCLHVDQUF2QjtBQUNBWixLQUFDLENBQUMsU0FBRCxDQUFELENBQWFhLEdBQWIsQ0FBaUIsV0FBakI7QUFDQWIsS0FBQyxDQUFDLE9BQUQsQ0FBRCxDQUFXYSxHQUFYLENBQWUsS0FBZjtBQUNILEdBTkQ7QUFRQWIsR0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQmMsRUFBbEIsQ0FBcUIsUUFBckIsRUFBOEIsYUFBOUIsRUFBNkMsVUFBU0MsS0FBVCxFQUFlO0FBQ3hEQSxTQUFLLENBQUNDLGNBQU47QUFDQWhCLEtBQUMsQ0FBQyxPQUFELENBQUQsQ0FBV2lCLElBQVgsQ0FBZ0IsVUFBaEIsRUFBMkIsVUFBM0I7QUFDQSxRQUFJQyxRQUFRLEdBQUdsQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFtQixTQUFSLEVBQWY7QUFDQW5CLEtBQUMsQ0FBQ08sSUFBRixDQUFPO0FBQ0hhLFNBQUcsRUFBQyxhQUREO0FBRUhDLFlBQU0sRUFBQyxNQUZKO0FBR0hDLFVBQUksRUFBQ0osUUFIRjtBQUlISyxhQUFPLEVBQUMsaUJBQVNELElBQVQsRUFBYztBQUNsQkUsaUJBQVM7QUFDVG5CLG1CQUFXLENBQUNFLElBQVosQ0FBaUJDLE1BQWpCLENBQXdCLElBQXhCLEVBQThCLEtBQTlCO0FBQ0gsT0FQRTtBQVFIaUIsV0FBSyxFQUFDLGlCQUFXO0FBQ2JELGlCQUFTO0FBQ1RFLGFBQUssQ0FBRSxXQUFGLENBQUw7QUFDSDtBQVhFLEtBQVA7QUFhSCxHQWpCRDtBQW1CQTFCLEdBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUJjLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFNBQS9CLEVBQTBDLFlBQVU7QUFDaEQsUUFBSWEsRUFBRSxHQUFHdEIsV0FBVyxDQUFDdUIsR0FBWixDQUFpQjVCLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUTZCLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBakIsRUFBeUNQLElBQXpDLEdBQWdESyxFQUF6RDs7QUFDQSxRQUFHRyxPQUFPLENBQUMsOENBQUQsQ0FBVixFQUE0RDtBQUN4RDlCLE9BQUMsQ0FBQ08sSUFBRixDQUFPO0FBQ0hhLFdBQUcsRUFBQyxpQkFBZU8sRUFEaEI7QUFFSE4sY0FBTSxFQUFDLFFBRko7QUFHSEUsZUFBTyxFQUFDLGlCQUFTRCxJQUFULEVBQWU7QUFDbkJFLG1CQUFTO0FBQ1RuQixxQkFBVyxDQUFDRSxJQUFaLENBQWlCQyxNQUFqQixDQUF3QixJQUF4QixFQUE4QixLQUE5QjtBQUNILFNBTkU7QUFPSGlCLGFBQUssRUFBQyxpQkFBVztBQUNiRCxtQkFBUztBQUNURSxlQUFLLENBQUUsY0FBRixDQUFMO0FBQ0g7QUFWRSxPQUFQO0FBWUgsS0FiRCxNQWFPO0FBQ0gsYUFBTyxLQUFQO0FBQ0g7QUFDSixHQWxCRDs7QUFvQkEsTUFBTUYsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBVztBQUN6QnhCLEtBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsQ0FBakIsRUFBb0JXLEtBQXBCO0FBQ0FYLEtBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JVLEtBQWxCLENBQXdCLE1BQXhCO0FBQ0FWLEtBQUMsQ0FBQyxPQUFELENBQUQsQ0FBV2lCLElBQVgsQ0FBZ0IsVUFBaEIsRUFBNEIsS0FBNUI7QUFDSCxHQUpEO0FBTUgsQ0E3RkQiLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvY2xpY2suanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjbGlja3NUYWJsZSA9ICQoJyNjbGlja3MtdGFibGUnKS5EYXRhVGFibGUoIHtcbiAgICAgICAgXCJhamF4XCI6IHtcbiAgICAgICAgICAgIFwidXJsXCI6IFwiL2FwaS9jbGlja3MvXCIsXG4gICAgICAgICAgICBcImRhdGFTcmNcIjogXCJcIlxuICAgICAgICB9LFxuXG4gICAgICAgIFwiY29sdW1uc1wiOiBbXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcImlkXCIgfSxcbiAgICAgICAgICAgIHsgXCJkYXRhXCI6IFwidWFcIiB9LFxuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJpcFwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcInJlZlwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcInBhcmFtMVwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcInBhcmFtMlwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcImVycm9yXCIgfSxcbiAgICAgICAgICAgIHsgXCJkYXRhXCI6IFwiYmFkX2RvbWFpblwiIH1cbiAgICAgICAgXVxuICAgIH0gKTtcblxuICAgIGNvbnN0IGRvbWFpblRhYmxlID0gJCgnI2RvbWFpbi10YWJsZScpLkRhdGFUYWJsZSgge1xuICAgICAgICBcImFqYXhcIjoge1xuICAgICAgICAgICAgXCJ1cmxcIjogXCIvYXBpL2RvbWFpbnMvXCIsXG4gICAgICAgICAgICBcImRhdGFTcmNcIjogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBcImNvbHVtbnNcIjogW1xuICAgICAgICAgICAgeyBcImRhdGFcIjogXCJpZFwiIH0sXG4gICAgICAgICAgICB7IFwiZGF0YVwiOiBcIm5hbWVcIiB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBudWxsLFxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdENvbnRlbnRcIjogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJkZWxldGVcIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi14cyBkZWxldGVcIj5EZWxldGU8L2J1dHRvbj4nLFxuICAgICAgICAgICAgICAgIFwiY2xhc3NOYW1lXCI6ICdkdC1ib2R5LXJpZ2h0JyxcbiAgICAgICAgICAgICAgICBcIm9yZGVyYWJsZVwiOmZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9ICk7XG5cbiAgICBzZXRJbnRlcnZhbCggZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGlja3NUYWJsZS5hamF4LnJlbG9hZChudWxsLCBmYWxzZSApO1xuICAgIH0sIDUwMDAgKTtcblxuICAgICQoJyNhZGREb21haW4nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAkKCcjZG9tYWluTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAkKCcjcmVjb3JkRm9ybScpWzBdLnJlc2V0KCk7XG4gICAgICAgICQoJy5tb2RhbC10aXRsZScpLmh0bWwoXCI8aSBjbGFzcz0nZmEgZmEtcGx1cyc+PC9pPiBBZGQgRG9tYWluXCIpO1xuICAgICAgICAkKCcjYWN0aW9uJykudmFsKCdhZGRSZWNvcmQnKTtcbiAgICAgICAgJCgnI3NhdmUnKS52YWwoJ0FkZCcpO1xuICAgIH0pO1xuXG4gICAgJChcIiNkb21haW5Nb2RhbFwiKS5vbignc3VibWl0JywnI2RvbWFpbkZvcm0nLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNzYXZlJykuYXR0cignZGlzYWJsZWQnLCdkaXNhYmxlZCcpO1xuICAgICAgICBsZXQgZm9ybURhdGEgPSAkKHRoaXMpLnNlcmlhbGl6ZSgpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOlwiL2FwaS9kb21haW5cIixcbiAgICAgICAgICAgIG1ldGhvZDpcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6Zm9ybURhdGEsXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgIHJlc2V0Rm9ybSgpO1xuICAgICAgICAgICAgICAgIGRvbWFpblRhYmxlLmFqYXgucmVsb2FkKG51bGwsIGZhbHNlICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XG4gICAgICAgICAgICAgICAgYWxlcnQoIFwiQWRkIGVycm9yXCIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgICQoXCIjZG9tYWluLXRhYmxlXCIpLm9uKCdjbGljaycsICcuZGVsZXRlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IGlkID0gZG9tYWluVGFibGUucm93KCAkKHRoaXMpLnBhcmVudHMoJ3RyJykgKS5kYXRhKCkuaWQ7XG4gICAgICAgIGlmKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZG9tYWluP1wiKSkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6XCIvYXBpL2RvbWFpbi9cIitpZCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6XCJERUxFVEVcIixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbWFpblRhYmxlLmFqYXgucmVsb2FkKG51bGwsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjpmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCBcIkRlbGV0ZSBlcnJvclwiICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzZXRGb3JtID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICQoJyNkb21haW5Gb3JtJylbMF0ucmVzZXQoKTtcbiAgICAgICAgJCgnI2RvbWFpbk1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgJCgnI3NhdmUnKS5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICB9XG5cbn0gKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/click.js\n");

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