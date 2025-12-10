import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  overflow-y: auto;
  color: #fff;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 2px solid #C09943;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 15px;
  z-index: 100;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;

  &:hover {
    color: #C09943;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BookingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BookingForm = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 12px;
  padding: 30px;
`;

const FormTitle = styled.h2`
  color: #C09943;
  margin-top: 0;
  font-size: 22px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #C09943;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #C09943;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 10px rgba(192, 153, 67, 0.5);
  }

  option {
    background: #1a1a1a;
    color: #fff;
  }
`;

const TicketTypeGroup = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #C09943;
  border-radius: 8px;
  padding: 15px;
`;

const TicketOption = styled.label`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(192, 153, 67, 0.2);
  }

  input {
    margin-right: 12px;
    cursor: pointer;
    accent-color: #C09943;
  }
`;

const TicketName = styled.span`
  color: #fff;
  font-weight: bold;
`;

const TicketPrice = styled.span`
  color: #C09943;
  margin-left: auto;
  font-weight: bold;
`;

const BookingSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #C09943;
  border-radius: 12px;
  padding: 30px;
  position: sticky;
  top: 100px;

  @media (max-width: 768px) {
    position: static;
  }
`;

const SummaryTitle = styled.h2`
  color: #C09943;
  margin-top: 0;
  font-size: 22px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(192, 153, 67, 0.2);
  color: rgba(255, 255, 255, 0.8);

  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const SummaryValue = styled.span`
  color: #fff;
  font-weight: bold;
`;

const TotalSection = styled.div`
  background: rgba(192, 153, 67, 0.1);
  border-top: 2px solid #C09943;
  padding-top: 20px;
  margin-top: 20px;
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: #C09943;
  font-weight: bold;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #C09943 0%, #a8773f 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 25px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(192, 153, 67, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(76, 175, 80, 0.2);
  border: 2px solid #4CAF50;
  color: #4CAF50;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const TicketingScreen = ({ onBack, user }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: 'morning',
    ticketType: 'adult',
    quantity: '1',
    firstName: '',
    lastName: '',
    email: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [addCartSuccess, setAddCartSuccess] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    try {
      const c = JSON.parse(localStorage.getItem('gem_cart') || '[]');
      return Array.isArray(c) ? c.length : 0;
    } catch (e) {
      return 0;
    }
  });

  const ticketPrices = {
    adult: 25,
    student: 15,
    child: 10,
    senior: 12,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (formData.date && formData.firstName && formData.lastName && formData.email) {
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000);
      setFormData({
        date: '',
        time: 'morning',
        ticketType: 'adult',
        quantity: '1',
        firstName: '',
        lastName: '',
        email: '',
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleAddToCart = () => {
    // create a cart item
    const item = {
      id: `cart_${Date.now()}`,
      ticketType: formData.ticketType,
      quantity: parseInt(formData.quantity || '1', 10),
      date: formData.date || null,
      time: formData.time,
      pricePerTicket: ticketPrices[formData.ticketType] || 0,
      total: (ticketPrices[formData.ticketType] || 0) * (parseInt(formData.quantity || '1', 10)),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('gem_cart') || '[]');
      const arr = Array.isArray(existing) ? existing : [];
      arr.push(item);
      localStorage.setItem('gem_cart', JSON.stringify(arr));
      setCartCount(arr.length);
      setAddCartSuccess(true);
      setTimeout(() => setAddCartSuccess(false), 2500);
    } catch (e) {
      console.error('Failed to add to cart', e);
      alert('Could not add to cart.');
    }
  };

  const totalPrice = (ticketPrices[formData.ticketType] || 0) * (parseInt(formData.quantity) || 1);

  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>⬅️</BackButton>
        <Title>Buy Tickets 🎫</Title>
      </Header>

      <Content>
        {bookingSuccess && (
          <SuccessMessage>
            ✓ Booking Confirmed! Check your email for ticket details.
          </SuccessMessage>
        )}

        <BookingContainer>
          <BookingForm>
            <FormTitle>Booking Details</FormTitle>

            <FormGroup>
              <Label>Visit Date *</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </FormGroup>

            <FormGroup>
              <Label>Time Slot *</Label>
              <Select name="time" value={formData.time} onChange={handleInputChange}>
                <option value="morning">🌅 Morning (9:00 AM - 12:00 PM)</option>
                <option value="afternoon">☀️ Afternoon (12:00 PM - 4:00 PM)</option>
                <option value="evening">🌙 Evening (4:00 PM - 8:00 PM)</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Ticket Type *</Label>
              <TicketTypeGroup>
                <TicketOption>
                  <input
                    type="radio"
                    name="ticketType"
                    value="adult"
                    checked={formData.ticketType === 'adult'}
                    onChange={handleInputChange}
                  />
                  <TicketName>Adult (18+)</TicketName>
                  <TicketPrice>${ticketPrices.adult}</TicketPrice>
                </TicketOption>
                <TicketOption>
                  <input
                    type="radio"
                    name="ticketType"
                    value="student"
                    checked={formData.ticketType === 'student'}
                    onChange={handleInputChange}
                  />
                  <TicketName>Student</TicketName>
                  <TicketPrice>${ticketPrices.student}</TicketPrice>
                </TicketOption>
                <TicketOption>
                  <input
                    type="radio"
                    name="ticketType"
                    value="child"
                    checked={formData.ticketType === 'child'}
                    onChange={handleInputChange}
                  />
                  <TicketName>Child (6-17)</TicketName>
                  <TicketPrice>${ticketPrices.child}</TicketPrice>
                </TicketOption>
                <TicketOption>
                  <input
                    type="radio"
                    name="ticketType"
                    value="senior"
                    checked={formData.ticketType === 'senior'}
                    onChange={handleInputChange}
                  />
                  <TicketName>Senior (65+)</TicketName>
                  <TicketPrice>${ticketPrices.senior}</TicketPrice>
                </TicketOption>
              </TicketTypeGroup>
            </FormGroup>

            <FormGroup>
              <Label>Quantity *</Label>
              <Select name="quantity" value={formData.quantity} onChange={handleInputChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Ticket' : 'Tickets'}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>First Name *</Label>
              <Input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormGroup>
          </BookingForm>

          <BookingSummary>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryItem>
              <SummaryLabel>Ticket Type:</SummaryLabel>
              <SummaryValue>{formData.ticketType.charAt(0).toUpperCase() + formData.ticketType.slice(1)}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>Price per Ticket:</SummaryLabel>
              <SummaryValue>${ticketPrices[formData.ticketType]}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
              <SummaryLabel>Quantity:</SummaryLabel>
              <SummaryValue>{formData.quantity}</SummaryValue>
            </SummaryItem>

            {formData.date && (
              <SummaryItem>
                <SummaryLabel>Date:</SummaryLabel>
                <SummaryValue>{new Date(formData.date).toLocaleDateString()}</SummaryValue>
              </SummaryItem>
            )}

            <TotalSection>
              <TotalAmount>
                <span>Total:</span>
                <span>${totalPrice}</span>
              </TotalAmount>
            </TotalSection>

            {addCartSuccess && (
              <SuccessMessage style={{ background: 'rgba(64,153,255,0.12)', borderColor: '#40a1ff', color: '#40a1ff' }}>
                ✓ Added to cart ({cartCount} item{cartCount !== 1 ? 's' : ''})
              </SuccessMessage>
            )}

            <BookButton onClick={handleAddToCart} style={{ marginBottom: 10 }}>
              Add to Cart
            </BookButton>

            <BookButton onClick={handleBooking}>
              Proceed to Payment
            </BookButton>
          </BookingSummary>
        </BookingContainer>
      </Content>
    </Container>
  );
};

export default TicketingScreen;
