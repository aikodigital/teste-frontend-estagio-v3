import React, { useState } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from 'papaparse';

import "../style/MoreInfoPage.css";
import closeButton from "../img/close.svg";

function MoreInfoPage({
    id,
    handleClose,
    getEquipmentName,
    getEquipmentLastState,
    getEquipmentModelName,
    getFormatedDate,
    equipmentState,
    equipmentStateHistory,
}) {
    const [page, setPage] = useState(1);
    const perPage = 10;

    function getModel() {
        return getEquipmentModelName(id);
    }

    function getState() {
        return getEquipmentLastState(id);
    }

    function getName() {
        return getEquipmentName(id);
    }

    function getDate() {
        return getFormatedDate(getState());
    }

    function getListStates(toFind) {
        return getFormatedDate(toFind);
    }

    function getNameState(stateId) {
        const stateDetailed = equipmentState.find((item) => item.id === stateId);

        return stateDetailed;
    }

    function getStatesLength() {
        const total = equipmentStateHistory.find((item) => item.equipmentId === id);
        return Math.ceil(total.states.length / perPage);
    }

    function getStateStyle(name) {
        switch (name) {
            case "Manutenção":
                return {
                    color: "#e74c3c",
                    fontWeight: 700,
                };
            case "Operando":
                return {
                    color: "#2ecc71",
                    fontWeight: 700,
                };
            case "Parado":
                return {
                    color: "#f1c40f",
                    fontWeight: 700,
                };
            default:
                return null;
        }
    }

    function listHistory() {
        const history = equipmentStateHistory.find(
            (item) => item.equipmentId === id
        );

        const list = [];
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const states = history.states.slice(start, end);
        states.forEach((state, i) => {
            list.push(
                <div className="history-item flex-align" key={i}>
                    <div className="container-line">
                        <div className="base-data onList flex-align">
                            <span className="title-font-color indicator">Data: </span>
                            <span>{getListStates(state)}</span>
                        </div>
                        <div className="base-data flex-align">
                            <span className="title-font-color indicator">Estado: </span>
                            <span
                                style={getStateStyle(getNameState(state.equipmentStateId).name)}
                            >
                                {getNameState(state.equipmentStateId).name}
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
        return list;
    }

    function handleNextPage() {
        setPage(page + 1);
    }

    function handlePrevPage() {
        setPage(page - 1);
    }

    function handleDownloadCSV() {
        const equipmentName = getEquipmentName(id);
        const date = new Date().toLocaleDateString().replace('///g', '-');
        // const title = `${equipmentName} - ${id}`;
        const fileName = `historico_ - _${equipmentName}_-_${id}_-_${date}.csv`;
        const rows = equipmentStateHistory
            .find((item) => item.equipmentId === id)
            .states.map((state, i) => [
                i,
                getListStates(state),
                getNameState(state.equipmentStateId).name,
            ]);

        const csvRows = [
            ["Index", "Data e Hora", "Estado"],
            ...rows
        ]

        const csvString = Papa.unparse(csvRows, {
            encoding: "UTF-8"
        });

        const csvBlob = new Blob(["\ufeff", csvString], { type: "text/csv;charset=UTF-8" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(csvBlob);
        link.download = fileName;
        link.click();
    }

    function handleDownloadPDF() {
        const equipmentName = getEquipmentName(id);
        const date = new Date().toLocaleDateString().replace(/\//g, '-');
        const fileName = `historico_-_${equipmentName}_-_${date}`;
        const title = `${equipmentName} - ${id}`;

        const rows = equipmentStateHistory
            .find((item) => item.equipmentId === id)
            .states.map((state, i) => [
                i,
                getListStates(state),
                getNameState(state.equipmentStateId).name,
            ]);

        const doc = new jsPDF();

        doc.text(
            40,
            8,
            title
        )

        doc.autoTable({
            head: [["Index", "Data e Hora", "Estado"]],
            body: rows,
            theme: "grid",
            showHead: "everyPage",
            tableId: title
        });

        doc.save(fileName);
    }

    return (
        <div className="moreInfoPage-container">
            <div className="moreInfoPage">
                <div className="upTop">
                    <div className="closeButton-container" onClick={handleClose}>
                        <img src={closeButton} alt="closeButton" />
                    </div>
                </div>
                <h2 className="title-font-color">Informações do equipamento</h2>
                <div className="allInfo-container">
                    <p className="base-data">
                        {" "}
                        <span className="title-font-color indicator">Modelo: </span>
                        {getModel()}
                    </p>
                    <p className="base-data">
                        {" "}
                        <span className="title-font-color indicator">Nome: </span>
                        {getName()}
                    </p>
                    <p className="base-data">
                        {" "}
                        <span className="title-font-color indicator">
                            Última atualização:{" "}
                        </span>
                        {getDate()}
                    </p>
                    <p className="base-data">
                        <span className="title-font-color indicator">Estado: </span>
                        <span style={getState().props.style}>{getState().props.name}</span>
                    </p>
                </div>

                <h2 className="title-font-color">Histórico</h2>
                <div className="history-container">
                    <div className="download-buttons">
                        <button onClick={handleDownloadCSV}>Download CSV</button>
                        <button onClick={handleDownloadPDF}>Download PDF</button>
                    </div>

                    {listHistory()}
                    <div className="pagination-container">
                        {page !== 1 && (
                            <div
                                className="pagination-button"
                                onClick={handlePrevPage}
                                disabled={page === 1}
                            >
                                <span>Página Anterior</span>
                            </div>
                        )}
                        <p className="pagination-page">
                            {page}/{getStatesLength()}
                        </p>
                        {page < getStatesLength() && (
                            <div
                                className="pagination-button"
                                onClick={handleNextPage}
                                disabled={page * perPage >= getStatesLength()}
                            >
                                <span>Próxima página</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoreInfoPage;
