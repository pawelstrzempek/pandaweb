function panel()
{
    this.amount;
    this.a_cable_conn = 4;
    this.a_asic = 2;
    this.create_panel();
    this.params_board = '';
    this.sep = 0;
    this.send_value = new Array();
    this.temp_value = new Array();
    this.barsValue = new Array(0,0);
    this.temp_id;
    this.checkAll;
    this.applyToAll;
    this.applyToAllId = 'asic_111';
};

panel.prototype.create_panel = function() {
    this.sep = 0;
    tdcNumberUpdate();
    tdcAddrUpdate();
    this.amount = numberOfTdc;//parseInt($("#number_board").val());
    this.checkAll = jQuery("#checkbox1").prop("checked"); 
    this.applyToAll = jQuery("#checkbox2").prop("checked");
    
    this.create_plyty();

    if(typeof(this.params_board) != 'undefined') {
        var ht = $("#params").html(this.params_board);

    }
};

panel.prototype.create_plyty = function() {
    var html = '';
    this.params_board = '';
    for (var i=1; i <= this.amount; i++) {
        html += this.create_plyta(i);
    }
    $("#board_panel").html(html).fadeIn('slow');
};

panel.prototype.create_plyta = function(i) {
    this.n_plyta = i;
    var name = 'TDC ' + tdcAddr[i-1];//'Plyta '+i;
    //html = '<div class="c_plyta"><div class="section-title">Plyta-'+this.n_plyta+'</div>';
    html = '<div class="c_plyta"><div class="section-title">TDC-'+tdcAddr[this.n_plyta-1]+'</div>';
    html += this.create_cable_conns();
    html += '</div>';
    return html;
};

panel.prototype.create_cable_conns = function() {
    var html = '';
    html += '<div class="c_group">';
    for (var i= 1; i <= this.a_cable_conn; i++) {
        html += this.create_cable_conn(i);
    }
    html += '<div class="clear"></div>';
    html += '</div>';
    return html;
};

panel.prototype.create_cable_conn = function(i) {
    this.n_cable_conn = i;
    var html = '';
    html += '<div class="fleft c_conn">';
    html += '<label class="checkbox-box">'+this.get_input('cable');
    html += '<span class="label-span">Cable conn-'+this.n_cable_conn+'</span></label>';
    html += this.create_asics();

    html += '</div>';
    return html;
};
panel.prototype.get_input = function(type) {
    var checked = '';
    if (this.checkAll) {
        checked = 'checked';
    }
    
    if (type == 'cable') {
        return '<input type="checkbox" '+checked+' class="input_cable_conn" name="cable_conn_'+this.n_plyta+'" value="asic_'+this.n_plyta+''+this.n_cable_conn+'" class="input1">';
    }
    if (type == 'asic') {
        return '<input type="checkbox" '+checked+' name="asic_'+this.n_plyta+''+this.n_cable_conn+'" id="asic_'+this.n_plyta+''+this.n_cable_conn+this.n_asic+'" class="input1 asic-table">';
    }
};
panel.prototype.create_asics = function() {
    
    var html = '';
    html += '<div class="row row-asic" style="'+(this.checkAll ? '' : 'display:none')+'">';
    for (var i=1; i <= this.a_asic; i++) {
       html += this.create_asic(i);
    }
    html += '</div>';
    return html;
};
panel.prototype.create_asic = function(i) {
    this.n_asic = i;
    var html = '';
    html += '<span class="c_asic">'+this.get_input('asic');
    html += 'Asic-'+this.n_asic+'</span>';

    if (this.sep %2 == 0) {
        this.params_board += '<div class="table-params-row fleft">';
    }
    this.params_board += this.create_board_params();
    if (this.sep %2 != 0) {
        this.params_board += '</div>';
    }
    this.sep++;
    return html;
};

panel.prototype.create_board_params = function() {

    var html = '';
    var id = this.n_plyta+''+this.n_cable_conn+this.n_asic;
    var asic = 'asic'+id;
    
    this.temp_id = this.n_plyta+this.n_cable_conn+this.n_asic;
    html = '<div id="table_asic_'+id+'" class="conf" style="'+(this.checkAll ? '' : 'display:none')+'">';
    html += '<table class="configuration_tabel">';
    html += '<tr><td colspan="3" class="table_title"><b>TDC-'+tdcAddr[this.n_plyta-1]+' Cable-'+this.n_cable_conn+' Asic-'+this.n_asic+'</b></td></tr>';
    html += '<tr><td>Amplification  [mV/fC] </td><td colspan="2"><select id="AMPLI_'+asic+'" name="AMPLI_'+asic+'" onChange="setAsicValues(this)" data-id="asic_'+id+'"><option>0.67</option><option>1</option><option>2</option><option>4</option></select></td></tr>';
    html += '<tr><td>Peaking time [ns] </td><td colspan="2"><select id="PEAK_P'+asic+'" name="PEAK_P'+asic+'" onChange="setAsicValues(this)" data-id="asic_'+id+'"><option>35</option><option>20</option><option>15</option><option>10</option></select></td></tr>';
    html += '<tr><td>TC1C<sub>2-0</sub> [pF]</td><td colspan="2"><select id="TC1C_P'+asic+'" name="TC1C_P'+asic+'" onChange="setAsicValues(this)" data-id="asic_'+id+'"><option>16.5</option><option>15</option><option>13.5</option><option>12</option><option>10.5</option><option>9</option><option>7.5</option><option>6</option></select></td></tr>';
    html += '<tr><td>TC1R<sub>2-0</sub> [k&#937]</td><td colspan="2"><select id="TC1R_P'+asic+'" name="TC1R_P'+asic+'" onChange="setAsicValues(this)" data-id="asic_'+id+'"><option>31</option><option>27</option><option>23</option><option>19</option><option>15</option><option>11</option><option>7</option><option>3</option></select></td></tr>';
    html += '<tr><td>TC2C<sub>2-0</sub> [pF]</td><td colspan="2"><select id="TC2C_P'+asic+'" name="TC2C_P'+asic+'" onChange="setAsicValues(this)" data-id="asic_'+id+'"><option>1.65</option><option>1.5</option><option>1.35</option><option>1.2</option><option>1.05</option><option>0.9</option><option>0.75</option><option>0.6</option></select></td></tr>';
    html += '<tr><td>TC2R<sub>2-0</sub> [k&#937]</td><td colspan="2"><select id="TC2R_P'+asic+'" name="id="TC2R_P'+asic+'" onChange="setAsicValues(this)" data-id="asic_'+id+'"><option>26</option><option>23</option><option>20</option><option>17</option><option>14</option><option>11</option><option>8</option><option>5</option></select></td></tr>';
    html += '<tr class="separator"><td colspan="3">&nbsp</td></tr>';
    html += '<tr><td>Threshold (Baseline divide Baseline + 256 mV)</td>';
    html += '<td><input id="bar'+id+'0" name="b'+id+'0" onchange="update(jQuery(this), value)" type="range" min="0" max="254" step="1" value="0"></td>';
    html += '<td><output class="w-10" for="bar'+id+'0" id="bar'+id+'0value">0</output></td></tr>';
           
    html += '<tr><td>Base line channel 1</td><td><input id="bar'+id+'1" name ="b'+id+'1" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'1" id="bar'+id+'1value">0</output></td></tr>';
    html += '<tr><td>Base line channel 2</td><td><input id="bar'+id+'2" name ="b'+id+'2" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'2" id="bar'+id+'2value">0</output></td></tr>';
    html += '<tr><td>Base line channel 3</td><td><input id="bar'+id+'3" name ="b'+id+'3" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'3" id="bar'+id+'3value">0</output></td></tr>';
    html += '<tr><td>Base line channel 4</td><td><input id="bar'+id+'4" name ="b'+id+'4" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'4" id="bar'+id+'4value">0</output></td></tr>';
    html += '<tr><td>Base line channel 5</td><td><input id="bar'+id+'5" name ="b'+id+'5" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'5" id="bar'+id+'5value">0</output></td></tr>';    
    html += '<tr><td>Base line channel 6</td><td><input id="bar'+id+'6" name ="b'+id+'6" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'6" id="bar'+id+'6value">0</output></td></tr>';
    html += '<tr><td>Base line channel 7</td><td><input id="bar'+id+'7" name ="b'+id+'7" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'7" id="bar'+id+'7value">0</output></td></tr>';     
    html += '<tr><td>Base line channel 8</td><td><input id="bar'+id+'8" name ="b'+id+'8" onchange="update(jQuery(this), value)" type="range" min="-31" max="31" step="1" value="0"></td><td><output class="w-10" for="bar'+id+'8" id="bar'+id+'8value">0</output></td></tr>';

    html += '<tr><td id="total" colspan="3">&nbsp;</td></tr>';
    html += '<tr><td id="cmd" colspan="3">&nbsp;</td></tr>';
    html += '<tr><td id="err" colspan="3">&nbsp;</td></tr>';    
    html += '</table>';
    html += '</div>';
    
    return html;
};

panel.prototype.get_form_value = function(id) {
    var temp_form = jQuery("#table_"+id).html();
    var data = [];
    jQuery(temp_form).find('select').each(function(){
        var id = $(this).attr("id");
        var x = jQuery("#"+id).prop("selectedIndex");
        var y = jQuery("#"+id).prop("options");
        data[id] = y[x].text;
    });
    jQuery("#table_"+id).find('input[type=range]').each(function(){
        var id = $(this).attr("id");
        var value = $(this).val();
        var num = id.toString().substring(3,6);
        var bar = id.toString().substring(6,7);
        data["bar_"+bar] = value;
    });
    return data;
};
// funkcja uruchamiana przy przesuwaniu suwaka
function update(handler, value) {
    var _this = this;
    var id = handler.attr("id");
    jQuery("#"+id+"value").val(value);
    var num = id.toString().substring(3,6);
    var bar = id.toString().substring(6,7);

    clearTimeout( $.data( this, "changed" ) );
    $.data( this, "changed", setTimeout(function() {
        var asicNum = "asic_"+num;
        form.temp_value[asicNum]["bar_"+bar] = value;
        var applyToAll = jQuery("#checkbox2").prop("checked");
        if (applyToAll && (form.applyToAllId == asicNum)) {
            console.log("Updated to all");
            setToAll(bar, value);
        }
    }, 250) );
    console.log('data updated');
    console.log(form.temp_value);
}

function setToAll(barId, value) {
    jQuery("#form_board .conf").filter(":visible").each(function(i){
        var tableId = $(this).attr("id");

        var tableApplyToAllId = 'table_'+form.applyToAllId
        if (tableId != tableApplyToAllId) {
            var asicNum = tableId.replace("table_", "");
            var num = tableId.replace("table_asic_", "");
            form.temp_value[asicNum]["bar_"+barId] = value;
            jQuery("#"+tableId+" #bar"+num+""+barId).val(value);
            jQuery("#"+tableId+" #bar"+num+""+barId+"value").val(value);
        }
    });
}

function setAsicValues(sel) {
    var value = sel.value;
    id = jQuery(sel).data('id');
    form.temp_value[id][sel.id] = value;
    var applyToAll = jQuery("#checkbox2").prop("checked");
    if (applyToAll && (form.applyToAllId == id)) {
        console.log("Updated to all");
        jQuery("#form_board .conf").filter(":visible").each(function(i){
            var tableId = $(this).attr("id");
            var asicNum = tableId.replace("table_", "");
            var tableApplyToAllId = 'table_'+form.applyToAllId
            if (tableId != tableApplyToAllId) {
                form.temp_value[asicNum][sel.id] = value;
                var selId = sel.id;
                var num = tableId.replace("table_asic_", "");
                var newSelId = selId.substring(0, selId.length - 3)+""+num;
                jQuery("#"+tableId+" #"+newSelId).val(value);
            }
        });
        console.log(form.temp_value);
    }
}
panel.prototype.add_form_value = function(id) {
   temp_id = id;
   var temp_value = this.get_form_value(temp_id);
   form.temp_value[temp_id] = temp_value;  
   console.log("add_form_value");
   console.log(form.temp_value);
};

panel.prototype.del_form_value = function(id) {
   var temp_id = id;
   
   form.temp_value[temp_id] = null;
   delete form.temp_value[temp_id];
};
var form;
function createPanel() {
    form = new panel();
    
    var checkAll = jQuery("#checkbox1").prop("checked");
    if (checkAll) {
        jQuery("#form_board").find(".asic-table").each(function(){
            var id = $(this).attr("id");
            form.add_form_value(id);
        });
    }
}
var count_scrol = 0;
$(document).ready(function(){
    $( document ).on( 'click', '.input_cable_conn', function () { // Cable conn
        var _this = $(this);
        var val = _this.val();
        if(_this.prop( "checked" )) {
            _this.parent().parent().find('.row-asic').show();
            var asic1 = val+'1';
            var asic2 = val+'2';
            if ($('#'+asic1).prop("checked"))
                $('#table_'+asic1).show();
            if ($('#'+asic2).prop("checked"))
                $('#table_'+asic2).show();
        } else {
            _this.parent().parent().find('.row-asic').hide(); 
            $('#table_'+val+'1').hide();
            $('#table_'+val+'2').hide();
        }
    });
    
    $(document).on('click', '.asic-table', function() { // Asic
        var _this = $(this);
        var id = _this.prop('id');
        if(_this.prop( "checked" )) {
            $('#table_'+id).show();
            form.add_form_value(id);
        } else {
            $('#table_'+id).hide();
            form.del_form_value(id);
        }
    });

    $(document).on('click', '#checkbox1', function() {
        var _this = $(this);
        var hide = true;
        if(_this.prop( "checked" )) {
           hide = false;
           jQuery(".row-asic").show();
        }

        jQuery("#form_board").find(".asic-table").each(function(){
            var _this = $(this);
            var id = $(this).attr("id");
            if(hide == true) {
                $('#table_'+id).hide();
                form.del_form_value(id);
            } else {
                $('#table_'+id).show();
                form.add_form_value(id);
            }
        });
        jQuery("#form_board").find("#board_panel input").each(function(){
            if(hide == true) {
                jQuery(this).prop( "checked", false );
            } else {
                jQuery(this).prop( "checked", true );
            }
        });

        console.log("tmp");
        console.log(form.temp_value);
    });
});

// form.temp_value zawiera zapisan� tablic� z ustawieniami, suwaki s� zapisywane tam dopiero po przesuni�ciu konkretnego suwaka.
