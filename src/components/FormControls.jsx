import React from 'react'

const formElementClasses = (darkMode) =>
  `w-full p-3 border rounded-lg transition-colors ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-500 focus:border-green-500 focus:outline-none'
      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-600 focus:border-green-600 focus:outline-none'
  }`

const FormSectionComponent = ({ title, icon, children, grid = true }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4 flex items-center">
      {icon}
      {title}
    </h3>
    {grid ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    ) : (
      <div>{children}</div>
    )}
  </div>
)

export const FormSection = React.memo(FormSectionComponent);

const SelectInputComponent = ({ label, value, onChange, options, darkMode }) => (
  <div>
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className={formElementClasses(darkMode)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export const SelectInput = React.memo(SelectInputComponent);

const NumberInputComponent = ({ label, value, onChange, darkMode, ...props }) => (
  <div>
    <label className="block mb-2 text-sm font-medium">{label}</label>
    <input
      type="number"
      min="0"
      value={value}
      onChange={onChange}
      className={formElementClasses(darkMode)}
      {...props}
    />
  </div>
)

export const NumberInput = React.memo(NumberInputComponent);