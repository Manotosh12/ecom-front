import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  shippingAddress: Address;
  billingAddress: Address;
  newsletterSubscribed: boolean;
  twoFactorAuthEnabled: boolean;
}

const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    shippingAddress: { street: '', city: '', state: '', zip: '' },
    billingAddress: { street: '', city: '', state: '', zip: '' },
    newsletterSubscribed: false,
    twoFactorAuthEnabled: false,
  });

  useEffect(() => {
    axios
      .get<User>('http://localhost:5000/api/user/profile/1') // replace with dynamic ID
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Failed to fetch user:', err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type, dataset } = target;

    if (dataset.address) {
      const addressType = dataset.address as 'shippingAddress' | 'billingAddress';
      setUser((prev) => ({
        ...prev,
        [addressType]: {
          ...prev[addressType],
          [name]: value,
        },
      }));
    } else if (type === 'checkbox') {
      // Explicit cast for checked property
      const checked = (target as HTMLInputElement).checked;
      setUser((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/user/profile/1`, user);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block mb-2 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-semibold" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Shipping Address */}
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend className="font-semibold mb-4">Shipping Address</legend>
          <div className="space-y-4">
            <input
              type="text"
              name="street"
              data-address="shippingAddress"
              value={user.shippingAddress.street}
              onChange={handleChange}
              placeholder="Street"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="city"
              data-address="shippingAddress"
              value={user.shippingAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="state"
              data-address="shippingAddress"
              value={user.shippingAddress.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="zip"
              data-address="shippingAddress"
              value={user.shippingAddress.zip}
              onChange={handleChange}
              placeholder="ZIP Code"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </fieldset>

        {/* Billing Address */}
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend className="font-semibold mb-4">Billing Address</legend>
          <div className="space-y-4">
            <input
              type="text"
              name="street"
              data-address="billingAddress"
              value={user.billingAddress.street}
              onChange={handleChange}
              placeholder="Street"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="city"
              data-address="billingAddress"
              value={user.billingAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="state"
              data-address="billingAddress"
              value={user.billingAddress.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="zip"
              data-address="billingAddress"
              value={user.billingAddress.zip}
              onChange={handleChange}
              placeholder="ZIP Code"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </fieldset>

        {/* Preferences */}
        <fieldset className="space-y-4">
          <legend className="font-semibold">Preferences</legend>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="newsletterSubscribed"
              checked={user.newsletterSubscribed}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            Subscribe to newsletter
          </label>
           <div></div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="twoFactorAuthEnabled"
              checked={user.twoFactorAuthEnabled}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            Enable two-factor authentication
          </label>
        </fieldset>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
