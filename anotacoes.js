

      /*
      if ($('.tableRowComments').length > 0) {
        console.log($('.tableRowComments').length > 0);


          $('.tableRowComments').remove();
          console.log("*****  removi a tabela *****");
          console.log("*****  reconstruindo a tabela *****");
            var tabela = $("#tableComments");
            var tbody = $("tbody", tabela);

            $.each(retDataSet.values, function(key, item) {
              var tr = $("<tr class='tableRowComments'>");

              tr.append( $("<td>", {'text': item.Login}) );
              tr.append( $("<td>", {'text': item.Nome}) );
              tr.append( $("<td>", {'text': item.Comments_por_usuario}) );

              tbody.append(tr);
            });
          console.log("*****  tabela construída !!*****");
        }
        else{
          console.log("***** nao tinha nada no lenght *****");
          console.log("***** construindo a tabela do zero *****");
            var tabela = $("#tableComments");
            var tbody = $("tbody", tabela);

            $.each(retDataSet.values, function(key, item) {
              var tr = $("<tr class='tableRowComments'>");

              tr.append( $("<td>", {'text': item.Login}) );
              tr.append( $("<td>", {'text': item.Nome}) );
              tr.append( $("<td>", {'text': item.Comments_por_usuario}) );

              tbody.append(tr);
            });
          console.log("***** tabela construída do zero !! *****");

        }
        */