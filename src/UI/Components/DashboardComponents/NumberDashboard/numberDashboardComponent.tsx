import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  amount: number;
  label: string;
  suffix?: string;
};
const NumberDashboardComponent = ({ amount, label, suffix}: Props) => {
  return (
    <>
          
          <div
            // key={id}
            className={`revenue-card`}
          >
            <div className="icon-container">
              <div className="icon-background">
                <PersonIcon fontSize="large" />
              </div>
              <div className="icon-badge">
                <div className="badge-inner">
                  <CheckIcon />
                </div>
              </div>
            </div>

            <div className="card-content">
              <h2 className="amount">{amount} {suffix}</h2>
              <p className="label">{label}</p>
              <div className="change-indicator">
              </div>
            </div>
          </div>
    </>
  );
};

export default NumberDashboardComponent;
