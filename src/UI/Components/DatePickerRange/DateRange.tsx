
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangeCalendarProps {
  onDateRangeChange?: (range: DateRange) => void;
  initialRange?: DateRange;
  compact?: boolean;
}

const DateRangeCalendar: React.FC<DateRangeCalendarProps> = ({
  onDateRangeChange,
  initialRange,
  compact = false,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    initialRange || { startDate: null, endDate: null }
  );
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isInRange = (date: Date): boolean => {
    const { startDate, endDate } = selectedRange;
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isInHoverRange = (date: Date): boolean => {
    const { startDate } = selectedRange;
    if (!startDate || !hoveredDate || selectedRange.endDate) return false;

    const start = startDate < hoveredDate ? startDate : hoveredDate;
    const end = startDate < hoveredDate ? hoveredDate : startDate;

    return date >= start && date <= end;
  };

  const isRangeStart = (date: Date): boolean => {
    return selectedRange.startDate?.toDateString() === date.toDateString();
  };

  const isRangeEnd = (date: Date): boolean => {
    return selectedRange.endDate?.toDateString() === date.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      const newRange = { startDate: date, endDate: null };
      setSelectedRange(newRange);
      onDateRangeChange?.(newRange);
    } else {
      const startDate = selectedRange.startDate;
      const endDate = date;

      const finalRange = startDate <= endDate
        ? { startDate, endDate }
        : { startDate: endDate, endDate: startDate };

      setSelectedRange(finalRange);
      onDateRangeChange?.(finalRange);
      
      if (compact) {
        setIsOpen(false);
      }
    }
  };

  const formatDateRange = (): string => {
    const { startDate, endDate } = selectedRange;
    if (!startDate) return "Seleccionar fechas";

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };

    if (!endDate) {
      return `${formatDate(startDate)}`;
    }

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const days = getDaysInMonth(currentDate);

  // Estilos base
  const baseStyles = {
    container: {
      position: "relative" as const,
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    trigger: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 16px",
      backgroundColor: "#ffffff",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      transition: "all 0.2s ease",
      minWidth: "280px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    calendar: {
      position: "absolute" as const,
      top: "100%",
      left: "0",
      zIndex: 50,
      marginTop: "8px",
      width: "350px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 20px 16px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e5e7eb",
    },
    navButton: {
      padding: "8px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1f2937",
      margin: 0,
    },
    daysGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "4px",
      padding: "16px 20px 8px",
    },
    dayHeader: {
      textAlign: "center" as const,
      fontSize: "12px",
      fontWeight: "600",
      color: "#6b7280",
      padding: "8px 0",
      textTransform: "uppercase" as const,
    },
    datesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "2px",
      padding: "0 20px 20px",
    },
    dateButton: {
      height: "36px",
      width: "36px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      position: "relative" as const,
      backgroundColor: "transparent",
      color: "#374151",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties,
    footer: {
      padding: "16px 20px",
      borderTop: "1px solid #e5e7eb",
      backgroundColor: "#f8fafc",
    },
    footerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    rangeDisplay: {
      fontSize: "13px",
      color: "#6b7280",
    },
    clearButton: {
      fontSize: "12px",
      color: "#dc2626",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "4px 8px",
      borderRadius: "6px",
      transition: "all 0.2s ease",
    },
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
    },
  };

  // Renderizar calendario completo o compacto
  const renderCalendar = () => (
    <div style={baseStyles.calendar}>
      <div style={baseStyles.header}>
        <button
          onClick={() => navigateMonth("prev")}
          style={baseStyles.navButton}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e5e7eb"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <ChevronLeft size={16} color="#6b7280" />
        </button>

        <h2 style={baseStyles.title}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>

        <button
          onClick={() => navigateMonth("next")}
          style={baseStyles.navButton}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e5e7eb"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
        >
          <ChevronRight size={16} color="#6b7280" />
        </button>
      </div>

      <div style={baseStyles.daysGrid}>
        {daysOfWeek.map((day) => (
          <div key={day} style={baseStyles.dayHeader}>
            {day}
          </div>
        ))}
      </div>

      <div style={baseStyles.datesGrid}>
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} style={{ height: "36px" }} />;
          }

          const isToday = date.toDateString() === new Date().toDateString();
          const isSelected = isRangeStart(date) || isRangeEnd(date);
          const isInSelectedRange = isInRange(date);
          const isInHover = isInHoverRange(date);

          let buttonStyle: React.CSSProperties = { ...baseStyles.dateButton };

          if (isSelected) {
            buttonStyle.backgroundColor = "#3b82f6";
            buttonStyle.color = "#ffffff";
            buttonStyle.fontWeight = "600";
          } else if (isInSelectedRange || isInHover) {
            buttonStyle.backgroundColor = "#dbeafe";
            buttonStyle.color = "#1d4ed8";
          } else if (isToday) {
            buttonStyle.backgroundColor = "#f1f5f9";
            buttonStyle.color = "#0f172a";
            buttonStyle.fontWeight = "600";
            buttonStyle.border = "2px solid #3b82f6";
          }

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              style={buttonStyle}
              onMouseOver={(e) => {
                if (!isSelected && !isInSelectedRange && !isInHover) {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                }
              }}
              onMouseOut={(e) => {
                if (!isSelected && !isInSelectedRange && !isInHover && !isToday) {
                  e.currentTarget.style.backgroundColor = "transparent";
                } else if (isToday && !isSelected) {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                }
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div style={baseStyles.footer}>
        <div style={baseStyles.footerContent}>
          <div style={baseStyles.rangeDisplay}>
            {selectedRange.startDate && selectedRange.endDate 
              ? `${formatDateRange()}` 
              : selectedRange.startDate 
                ? "Selecciona fecha final" 
                : "Selecciona fechas"
            }
          </div>
        </div>
      </div>
    </div>
  );

  if (compact) {
    return (
      <div style={baseStyles.container}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            ...baseStyles.trigger,
            borderColor: isOpen ? "#3b82f6" : "#e5e7eb",
            backgroundColor: isOpen ? "#f8fafc" : "#ffffff",
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.borderColor = "#e5e7eb";
          }}
        >
          <Calendar size={16} color="#6b7280" />
          <span>{formatDateRange()}</span>
          <ChevronLeft 
            size={16} 
            color="#6b7280" 
            style={{ 
              transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)",
              transition: "transform 0.2s ease"
            }} 
          />
        </button>

        {isOpen && (
          <>
            <div style={baseStyles.overlay} onClick={() => setIsOpen(false)} />
            {renderCalendar()}
          </>
        )}
      </div>
    );
  }

  // Versión no compacta (original mejorada)
  return (
    <div style={{
      width: "100%",
      maxWidth: "380px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e5e7eb",
      fontFamily: "system-ui, -apple-system, sans-serif",
      overflow: "hidden",
    }}>
      {renderCalendar()}
    </div>
  );
};

export default DateRangeCalendar