import styles from './InfoFilter.module.scss'

export default function InfoFilter({equipmentAtualize,equipments,value,label }) {
    return (
        <div className={styles.filter}>
            <label>{label}</label>
            <select className={styles.filter__select} value={value} onChange={evt => equipmentAtualize(evt.target.value)}>
                <option> </option>
                {equipments.map(item => {
                    return <option key={item.id}> {item.name}</option>
                })}
            </select>
        </div>
    )
}