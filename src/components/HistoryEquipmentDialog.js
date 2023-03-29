import * as React from "react";

import * as MU from "@mui/material";
import { formatDate } from "./formatDate";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <MU.Slide direction="up" ref={ref} {...props} />;
});

export function HistoryEquipmentDialog(props) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (props.eqp && props.details) {
      setIsLoaded(true);
    }
  }, [props]);

  return isLoaded ? (
    <div>
      <MU.Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.close}
        aria-describedby="alert-dialog-slide-description"
        style={{ marginTop: "30%" }}
      >
        <MU.DialogTitle>
          {`${props.details.name} - ${props.details.model.name}`}
        </MU.DialogTitle>
        <MU.DialogContent>
          <MU.TableContainer component={MU.Paper}>
            <MU.Table sx={{ minWidth: 300 }} aria-label="simple table">
              <MU.TableHead>
                <MU.TableRow>
                  <MU.TableCell>Estado</MU.TableCell>
                  <MU.TableCell>Data</MU.TableCell>
                </MU.TableRow>
              </MU.TableHead>
              <MU.TableBody>
                {props.eqp.list
                  .slice(0)
                  .reverse()
                  .map((histEqp, i) => (
                    <MU.TableRow
                      key={i}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      style={
                        i === 0
                          ? {
                              backgroundColor: histEqp.color,
                            }
                          : {}
                      }
                    >
                      <MU.TableCell
                        style={
                          i === 0
                            ? {
                                fontWeight: "bold",
                              }
                            : {}
                        }
                        component="th"
                        scope="row"
                      >
                        {histEqp.name}
                      </MU.TableCell>
                      <MU.TableCell
                        style={
                          i === 0
                            ? {
                                fontWeight: "bold",
                              }
                            : {}
                        }
                      >
                        {formatDate(histEqp.date)}
                      </MU.TableCell>
                    </MU.TableRow>
                  ))}
              </MU.TableBody>
            </MU.Table>
          </MU.TableContainer>
        </MU.DialogContent>
      </MU.Dialog>
    </div>
  ) : (
    ""
  );
}
