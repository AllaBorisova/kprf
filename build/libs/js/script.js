

var topHeaderSlider = function() {
		setInterval(function() {
			var getActive = $(".active_slide_img");
			if (getActive.is(':last-child')) {
				$(".slider_body img:first-child").addClass("active_slide_img").siblings().removeClass("active_slide_img");
			} else {
				getActive.next().addClass("active_slide_img").siblings().removeClass("active_slide_img");
			}
		}, 5000);
	},
	switchSwipe = function(dir, that, swipe) {
		console.log(that);
		var activeLnd = that.find(".active_cell"),
			parentGlide = that.find(".js-main_slide_line");
			
			if (dir == "right") {
				if (swipe == true) {
					if (activeLnd.is(":first-child")) {
						return false;
					} else {
						activeLnd.prev().addClass("active_cell").siblings().removeClass("active_cell");
					}
				} else {
					if (activeLnd.is(":last-child")) {
						return false;
					} else {
						activeLnd.next().addClass("active_cell").siblings().removeClass("active_cell");
					}
				}
			} else {
				if (swipe == true) {
					if (activeLnd.is(":last-child")) {
						return false;
					} else {
						activeLnd.next().addClass("active_cell").siblings().removeClass("active_cell");
					}
				} else {
					if (activeLnd.is(":first-child")) {
						return false;
					} else {
						activeLnd.prev().addClass("active_cell").siblings().removeClass("active_cell");
					}
				}
			}
		
			var curentActivePos = that.find(".active_cell").position().left;
			parentGlide.css("left", -curentActivePos);
	},
	switchTap = function(that) {
		that.addClass("active_cell").siblings().removeClass("active_cell");
		var ulParent = that.parent(".js-main_slide_line"),
			curentActivePos = ulParent.find(".active_cell").position().left;
			ulParent.css("left", -curentActivePos);
	},
	tapSwitch = function(that) {
		that.addClass("active_tap").siblings().removeClass("active_tap");
		var parentTap = that.parent(),
			index = parentTap.find(".active_tap").index();
		$(".tap_container").eq(index).addClass("active_tap_cell").siblings().removeClass("active_tap_cell");
		checkHeight();
	},
	checkHeight = function() {
		for (var i=0; i<7; i++) {
			var getHeight = 0;
			$(".js-group_height_0" + i).each(function() {
				if ($(this).height() > getHeight) {
					getHeight = $(this).height();
				}
			});
			$(".js-group_height_0" + i).css("height", getHeight);
		}
	},
	setFirstCheck = function() {
		for (var i=0; i<7; i++) {
			$(".js-group_check_" + i).each(function() {
				$(this).find(".check_label:first-child").find(".checkbox").prop("checked", true);
				setPrice($(this).find(".check_label:first-child").find(".checkbox"));
			});
		}
	},
	setPrice = function(that) {
		var price = that.attr("data-price");
		that.parents(".check_space_items").next(".price_permonth").html(price + " руб.");
	},
	showPopUp = function(selector) {
		$(".background_fill").animate({opacity: "show"});
		$(".pop_up").animate({opacity: "hide"});
		$(selector).animate({opacity: "show"});
	},
	hidePopUp = function() {
		$(".background_fill").animate({opacity: "hide"});
		$(".pop_up").animate({opacity: "hide"});
	},
	nextStep = function() {
		$(".step_cell.active_step_cell").next().addClass("active_step_cell").siblings().removeClass("active_step_cell");
		$(".step_block_cell.active_step").next().addClass("active_step").siblings().removeClass("active_step");
	},
	checkErrors = function() {
		$(".form_input").each(function() {
			if ($(this).val() == "") {
				$(this).addClass("empty_input");
			} else {
				$(this).removeClass("empty_input");
			}
		});
	},
	checktarifDirection = function(btnSelector) {
		if (btnSelector.hasClass("js-direct_tarif")) {
			var checkRad = $("#" + btnSelector.attr("data-link")).find("input:checked").attr("data-tarlink");
			$("#tarif_iptions").find("option[data-tarif='"+checkRad+"']").prop('selected', true);
		} else if (btnSelector.hasClass("js-begin_tarif")) {
			$("#tarif_iptions").find("option[data-tarif='00']").prop('selected', true);
		} else if (btnSelector.hasClass("js-direct_group")) {
			var btnOptionVal = btnSelector.attr("data-dir-group");
			$("#tarif_iptions").find("option[data-tarif='"+btnOptionVal+"']").prop('selected', true);
		}
	},
	checkCouch = function(btnSelector) {
		if (btnSelector.hasClass("js-couch_sign")) {
			$("#couch_name_hide").val(btnSelector.attr("data-couch"));
		}
	}
	
$(function() {
	topHeaderSlider();
		
	$(window).load(function(e) {
		checkHeight();
		setFirstCheck();
	});
	
	$(window).resize(function(e) {
		checkHeight();
	});
	
	$(".js-next_step").on("click", function() {
		nextStep();
	});
	
	$(".menu_item_list").on("click", function() {
		var scrollLocation = $(this).attr("data-link"),
			anchorBlock = $("#" + scrollLocation).offset().top;
			
			$('html, body').animate({scrollTop : anchorBlock}, 400);
	});
	
	$(".js-triger_couch").on("click", function() {
		var activeNs = $(".tap_item_cell.active_cell_ng");
		if ($(this).attr("data-dir") == "left" && !activeNs.is(":first-child")) {
			activeNs.prev().addClass("active_cell_ng").siblings().removeClass("active_cell_ng");
		} else if ($(this).attr("data-dir") == "right" && !activeNs.is(":last-child")) {
			activeNs.next().addClass("active_cell_ng").siblings().removeClass("active_cell_ng");
		}
	});
	
	$(".js-callback").on("click", function() {
		var data = $("#callback_form").serialize();
		checkErrors();
		if ($(".js-val_callback").hasClass("empty_input") || $(".js-agree_callback").prop("checked") == false) {
			$(".js-errors_callback").addClass("show_error");
		} else {
			$(".js-errors_callback").removeClass("show_error");
			$.ajax({
				url: 'ajax/send.php',
				data: data,
				success: function(rdata){
					showPopUp(".success_pop_up");
				}
			});
		}
		
	});
	
	$(".js-order_sign").on("click", function() {
		var data = $("#order_form").serialize();
		checkErrors();
		if ($(".js-val_direct").hasClass("empty_input") || $(".js-agree_order").prop("checked") == false) {
			$(".js-errors_orders").addClass("show_error");
		} else {
			$(".js-errors_orders").removeClass("show_error");
			$.ajax({
				url: 'ajax/send.php',
				data: data,
				success: function(rdata){
					showPopUp(".success_pop_up");
				}
			});
		}
		
	});
	
	$(".js-step_send").on("click", function() {
		var data = $("#step_form").serialize();
		checkErrors();
		if ($(".js-val_steps").hasClass("empty_input") || $(".js-val_stepckeck").prop("checked") == false) {
			$(".js-steps_error").addClass("show_error");
		} else {
			$(".js-steps_error").removeClass("show_error");
			$.ajax({
				url: 'ajax/send.php',
				data: data,
				success: function(rdata){
					showPopUp(".success_pop_up");
				}
			});
		}
	});
	
	$(".js-send_form").on("click", function() {
		var data = $("#form_on_page").serialize();
		checkErrors();
		if ($(".js-single_phone").hasClass("empty_input") || $(".js-single_agree").prop("checked") == false) {
			showPopUp(".error_popup");
		} else {
			$.ajax({
				url: 'ajax/send.php',
				data: data,
				success: function(rdata){
					showPopUp(".success_pop_up");
				}
			});
		}
	});
	
	$(".js-call_order").on("click", function() {
		showPopUp(".call_back");
		checkCouch($(this));
	});
	
	$(".js-make_abon").on("click", function() {
		$(".step_cell:first-child").addClass("active_step_cell").siblings().removeClass("active_step_cell");
		$(".step_block_cell:first-child").addClass("active_step").siblings().removeClass("active_step");
		showPopUp(".step_side");
	});
	
	$(".close_cross, .background_fill").on("click", function() {
		hidePopUp();
	});
	
	$(".check_label").on("change", ".checkbox", function() {
		setPrice($(this));
	});
	
	$(".js-register_form").on("click", function() {
		showPopUp(".pre_order");
		checktarifDirection($(this));
	});
	
	$(".faq_header").on("click", function() {
		$(".faq_header").removeClass("active_faq");
		$(this).addClass("active_faq");
	});
	
	$(".gamb_menu").on("click", function() {
		$(".menu_expand").addClass("active_menu");
	});
	
	$(".close_cross_line").on("click", function() {
		$(".menu_expand").removeClass("active_menu");
	});
	
	$(".js-tap_item").on("click", function() {
		tapSwitch($(this));
	});
	
	$(".js-switcher_btn").on("click", function() {
		switchSwipe($(this).attr("data-dir"), $(".js-direction_ord"), false);
	});
	$(".js-switcher_couch").on("click", function() {
		switchSwipe($(this).attr("data-dir"), $(".js-couch_area"), false);
	});	
	$(".js-swipe_area").swipe({
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
			switchSwipe(direction, $(this), true);
        },
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			switchSwipe(direction, $(this), true);
        },
    });
	
	$(".slide_cell").swipe({
        tap:function(event, direction, distance, duration, fingerCount) {
			switchTap($(this));
        }
    });
	
	$(window).bind("scroll",function(e) {
		if ($(this).scrollTop() > 500) {
			$(".top_menu_head").addClass("active_menu");
		} else {
			$(".top_menu_head").removeClass("active_menu");
		}
	});
	
});