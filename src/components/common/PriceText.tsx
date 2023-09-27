enum Currency {
  MXN = 'MXN',
  USD = 'USD',
}

interface PriceTextProps {
  value: number
  currency: keyof typeof Currency | 'MXN'
  className?: string
}

function PriceText(props: PriceTextProps) {
  return (
    <div
      className={props.className}
    >
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {props.value.toFixed(2).split('.')[0]}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-600">
        .{props.value.toFixed(2).split('.')[1]}&nbsp;
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-600">
        {props.currency}
      </span>
    </div>
  )
}

export default PriceText
