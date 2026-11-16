import React from 'react';
import { Calendar, MapPin, Sparkles, Clock, ArrowRight, Bell, CheckCircle2 } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/trustData';

export function EventsCalendarSection() {
  return (
    <section id="events" className="section events-calendar-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Calendar size={14} />
            <span>पावन बौद्ध पर्व, वार्षिक महामहोत्सव व शिविर</span>
          </div>
          <h2 className="section-title">वार्षिक धम्म कार्यक्रम एवं महामहोत्सव</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            सारनाथ एवं देश के विभिन्न प्रांतों में आयोजित होने वाले आगामी बौद्ध सम्मेलनों, दीक्षा महोत्सवों व ध्यान शिविरों की अधिकृत तिथियां।
          </p>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {UPCOMING_EVENTS.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-date-column">
                <div className="event-badge-tag">{event.badge}</div>
                <div className="event-type-pill">{event.type}</div>
              </div>

              <div className="event-info-column">
                <div className="event-meta-row">
                  <span className="event-meta-item">
                    <Calendar size={14} color="#D97706" />
                    <strong>{event.date}</strong>
                  </span>
                  <span className="event-meta-item">
                    <MapPin size={14} color="#7A1414" />
                    <span>{event.location}</span>
                  </span>
                </div>

                <h4 className="event-title">{event.title}</h4>
                <p className="event-desc">{event.desc}</p>

                <div className="event-card-actions">
                  <a href="#forms" className="btn btn-outline btn-sm">
                    <Sparkles size={14} />
                    <span>सहभागिता पंजीकरण (RSVP)</span>
                  </a>
                  <span className="event-free-tag">
                    <CheckCircle2 size={13} color="#059669" />
                    <span>सभी हेतु निःशुल्क प्रवेश</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

