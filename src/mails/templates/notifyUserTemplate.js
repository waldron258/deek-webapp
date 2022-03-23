import { currencyFormat } from "../../Utils/Commons";

export const notifyUserTemplate = (items) => {
  return `<html>
        <head>
            <style type="text/css">
                table, th, td {
                  border: 1px solid black;
                  border-collapse: collapse;
                }
                th, td {
                  padding: 10px;
                }
                td {
                  text-align: center;
                }
            </style>
        </head>
        <body>
          <table style="width: 100%">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${items.map((item) => {
              return `<tr>
               <td>${item.title}</td>
               <td>${currencyFormat(item.price)}</td>
               <td>${item.qty}</td>
               <td>${currencyFormat(item.price * item.qty)}</td>
              </tr>`;
            })}</tbody>
          </table>
        </body>
      </html>`;
};
