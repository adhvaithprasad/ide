  API_KEY = "45b0e67815msh8f5fb5c3ed095a7p126d59jsn243789654347"; 

       

        function run() {

                //  var y = document.getElementById("cb");
                //  y.style.display="block";
            document.getElementById("run").innerHTML="Run <img src='run.gif' style='height:30px'/></img>";
            $("#output").val("⚙️ Creating submission... suppose you have inputs don't forget to enter it in compile input ");

            let encodedExpectedOutput = encode($("#expout").val());
            if (encodedExpectedOutput === "") {
                encodedExpectedOutput = null; // Assume that user does not want to use expected output if it is empty.
            }

            $.ajax({
                url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false",
                type: "POST",
                contentType: "application/json",
                headers: {
                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	                "x-rapidapi-key": API_KEY
                },
                data: JSON.stringify({
                    "language_id": 70,
                    // language_to_id[$("#lang").val()]
                    "source_code": encode(window.editor.getValue()),
                    "stdin": encode($("#input").val()),
                    "expected_output": encodedExpectedOutput,
                    "redirect_stderr_to_stdout": true
                }),
                success: function(data, textStatus, jqXHR) {
                    $("#output").val($("#output").val() + "\n🎉 Submission created.");
                    setTimeout(function() { check(data["token"]) }, 2000);
                },
                error: errorHandler
            });
        }

        

        $("#source").focus();
