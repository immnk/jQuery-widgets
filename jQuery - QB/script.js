$(document).ready(
    function() {
        var result = [{
            'id': 1
        }];
        var node = `<li>
                        <div class="row">
                            <div class="col-xs-1">
                                <select class="form-control logic">
                                	<option>and</option>
                                	<option>or</option>
                                </select>
                            </div>
                            <div class="col-xs-3">
                                <select class="form-control">
                                    <option>Company name</option>
                                    <option>From Email</option>
                                    <option>To Email</option>
                                    <option>Location</option>
                                </select>
                            </div>
                            <div class="col-xs-2">
                            	<select class="form-control">
                            		<option>is</option>
                            		<option>Equals</option>
                            		<option>Not Equals</option>
                            		<option>Contains</option>
                            	</select>
                            </div>
                            <div class="col-xs-3">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="dataLabel1" placeholder="Condition">
                                </div>
                            </div>
                            <div class="col-xs-2">
                                <button type="button" class="btn btn-default btn-minus">
                                    <i class="glyphicon glyphicon-minus"></i>
                                </button>
                                <button type="button" class="btn btn-default btn-plus">
                                    <i class="glyphicon glyphicon-plus"></i>
                                </button>
                            </div>
                        </div>
                    </li>`;

        $("#resultPattern").html(computeResultPattern());
        $(document).on("click", ".dropdown-menu li a", function() {
            var selText = $(this).text();
            $(this).parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
        });

        $(document).on('click', '.btn-plus', function() {
            result.push({
                'id': result.length + 1,
                'condition': 'and'
            });
            $("#conditions").append(node);
            $("#resultPattern").html(computeResultPattern());
        });

        $(document).on('click', '.btn-minus', function() {
            $(this.parentElement.parentElement.parentElement).remove();
            
            reCalculateResultArray();
            
            $("#resultPattern").html(computeResultPattern());
        });

        $(document).on('change', '.logic', function() {
            reCalculateResultArray();

            $("#resultPattern").html(computeResultPattern());
        })

        function computeResultPattern() {
            var resultPattern = "(1)";
            for (i = 1; i < result.length; i++) {
                var cnd = result[i];
                resultPattern = "( " + resultPattern + " " + cnd.condition + " " + cnd.id + " )";
            }

            return resultPattern;
        }

        function reCalculateResultArray() {
            result = [{
                'id': 1
            }];

            $("#conditions li .logic").each(function(index) {
                console.log(index + 2);
                console.log(this.value);

                result.push({
                    'id': index + 2,
                    'condition': this.value
                });
            });
        }
    });
